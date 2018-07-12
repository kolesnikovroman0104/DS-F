<?php

namespace App\src\Dingo\Auth\Provider;

use Exception;
use Dingo\Api\Auth\Provider\Authorization;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Tymon\JWTAuth\JWTAuth;
use Dingo\Api\Routing\Route;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Support\Str;

class JWT extends Authorization
{
    /**
     * The JWTAuth instance.
     *
     * @var \Tymon\JWTAuth\JWTAuth
     */
    protected $auth;

    /**
     * Create a new JWT provider instance.
     *
     * @param \Tymon\JWTAuth\JWTAuth $auth
     *
     * @return void
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Authenticate request with a JWT.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Dingo\Api\Routing\Route $route
     *
     * @return mixed
     */
    public function authenticate(Request $request, Route $route)
    {
        // Small code hack, we already have auth user by JWT
        if ($user = Auth::guard()->user())
            return $user;

        $token = $this->getToken($request);

        try {
            if (! $user = $this->auth->setToken($token)->authenticate()) {
                throw new UnauthorizedHttpException('JWTAuth', 'Unable to authenticate with invalid token.');
            }
        } catch (JWTException $exception) {
            throw new UnauthorizedHttpException('JWTAuth', $exception->getMessage(), $exception);
        }

        return $user;
    }

    /**
     * Get the JWT from the request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @throws \Exception
     *
     * @return string
     */
    protected function getToken(Request $request)
    {
        try {
            $this->validateAuthorizationData($request);

            if (($token = $this->parseAuthorizationHeader($request)) == null)
                    $token = $this->parseAuthorizationCookie($request);

        } catch (Exception $exception) {
            if (! $token = $request->query('token', false)) {
                throw $exception;
            }
        }

        return $token;
    }


    /**
     * Validate the requests authorization header for the provider.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @throws \Symfony\Component\HttpKernel\Exception\BadRequestHttpException
     *
     * @return bool
     */
    public function validateAuthorizationData(Request $request)
    {
        if (Str::startsWith(strtolower($request->headers->get('authorization')), $this->getAuthorizationMethod())) {
            return true;
        }

        if ($request->cookies->get('token')) {
            return true;
        }

        throw new BadRequestHttpException();
    }


    /**
     * Parse JWT from the authorization header.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return string
     */
    protected function parseAuthorizationHeader(Request $request)
    {
        return trim(str_ireplace($this->getAuthorizationMethod(), '', $request->header('authorization')));
    }


    /**
     * Parse JWT from the authorization cookies.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return string
     */
    protected function parseAuthorizationCookie(Request $request)
    {
        return $request->cookies->get('token');
    }

    /**
     * Get the providers authorization method.
     *
     * @return string
     */
    public function getAuthorizationMethod()
    {
        return 'bearer';
    }
}
