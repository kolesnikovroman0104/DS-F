<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Events\UserEmailChanged;
use App\Http\Controllers\Api\ApiController;
use App\Rules\CheckPasswordValidationRule;
use Carbon\Carbon;
use Cartalyst\Sentinel\Laravel\Facades\Activation;
use Dingo\Api\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;


class SettingsController extends ApiController
{

    public function __construct()
    {
        $this->middleware('api.auth');
        $this->middleware('user.corp')->only('changeFsnEmail');
    }

    /**
     * Change user password by enter new and OLD password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request)
    {
        $rules = [
            'old_password' => ['required','string','max:255',new CheckPasswordValidationRule],
            'new_password' => 'required|string|min:6|confirmed',
        ];
        $this->validateDingo($request, $rules);

        $user = $this->guard()->user();
        $user->password_updated_at = new Carbon();
        $user->password = Hash::make($request->input('new_password'));
        $user->save();

        $token = JWTAuth::fromUser($user);
        return $this->response()->array($this->tokenInformation($token));
    }


    /**
     * Action to change user email
     *
     * // TODO: separate activation table for user actions
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeEmail(Request $request){
        $rules = [
            'email' => 'required|string|email|max:255|unique:users|unique:users,new_email',
        ];

        $this->validateDingo($request,$rules);

        $user = $this->guard()->user();
        Activation::create($user,'email-change');
        $user->new_email=$request->input('email');
        $user->save();
        //Send Email to new user email with confirmation code
        event(new UserEmailChanged($user));

        return $this->response()->created();
    }

    /**
     * @param Request $request
     * @return \Dingo\Api\Http\Response
     */
    public function changeFnsEmail(Request $request){
        $rules = [
            'email' => 'required|string|email|max:255',
        ];

        $this->validateDingo($request,$rules);
        $corporate = $this->guard()->user()->corporate;

        $corporate->email = $request->input('email');
        $corporate->save();

        return $this->response()->created();

    }

}
