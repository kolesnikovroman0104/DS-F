<?php

namespace App\Http\Controllers\Api;

use Dingo\Api\Exception\ResourceException;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    use Helpers;

    public function validateDingo($request, array $rules, array $messages = [], array $customAttributes = [], string $errorMessage = 'error')
    {
        $validator = $this->getValidationFactory()->make($request->all(), $rules, $messages, $customAttributes);

        if ($validator->fails()) {
            throw new ResourceException($errorMessage, $validator->errors());
        }
    }



    /**
     * @param $token
     * @return array
     */
    protected function tokenInformation($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
        ];
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    protected function guard()
    {
        return Auth::guard();
    }


    protected function checkPermission(array $permissions){
        return Auth::user()->hasAccess($permissions);
    }
}
