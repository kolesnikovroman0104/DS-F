<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Http\Controllers\Api\ApiController;
use App\Transformers\V1\UserTransformer;
use Cartalyst\Sentinel\Checkpoints\NotActivatedException;
use Dingo\Api\Http\Request;
use Illuminate\Foundation\Testing\HttpException;
use Illuminate\Validation\UnauthorizedException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;


/**
 * @resource("Authenticate", uri="/api/auth")
 *
 *
 * Class AuthenticateController
 * @package App\Http\Controllers\Api\V1
 */
class AuthenticateController extends ApiController
{

    public function __construct()
    {
        $this->middleware('api.auth')->except('authenticate');
    }

    /**
     * Authenticate user by credentials and return auth token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(Request $request){
        $rules = [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ];
        $this->validateDingo($request,$rules);

        $credentials = $request->only('email', 'password');

        try {
            if (!$token = $this->guard()->attempt($credentials)) {
                throw new UnauthorizedException('Bad Credentials');
            }
        } catch (JWTException $e) {
            throw new HttpException('Could not create token');
        }
        catch (NotActivatedException $e){
            throw new UnauthorizedException('Your account is not activated');
        }

        return $this->response()->array($this->tokenInformation($token))->withCookie('token',$token);
    }


    /**
     * @Get("/api/auth/")
     * @Versions({"v1"})
     * @Transaction({
     *  @Response(200,body={"access_token": "token","token_type": "bearer", "expires_in": "time"}),
     *  @Response(401,body={"error": "invalid_credentials"}),
     *  @Response(500,body={"error": "could_not_create_token"}),
     * })
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(){
        try{
            $this->guard()->logout();
        }
        catch (JWTException $e){
            throw new HttpException('Internal problem '.$e->getMessage());
        }

        return $this->response()->created()->withCookie(\Cookie::forget('token'));
    }


    /**
     * Refresh expired token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refreshToken(){
        try{
            $token = $this->guard()->parseToken()->refresh();
        }catch (TokenInvalidException $e){
            throw new UnauthorizedException('Your token is Invalid',$e->getStatusCode());
            //return response()->json(['error'=>$e->getMessage(),401]);
        }

        return $this->response()->array($this->tokenInformation($token));
    }


    /**
     * Return info about auth user
     *
     * @return \Dingo\Api\Http\Response
     */
    public function getUser(){
        $user = $this->guard()->user();

        return $this->response()->item($user, new UserTransformer());
    }
}
