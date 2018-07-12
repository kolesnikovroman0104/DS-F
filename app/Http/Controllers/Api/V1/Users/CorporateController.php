<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Events\CorpInviteGenerate;
use App\Http\Controllers\Api\ApiController;
use Cartalyst\Sentinel\Laravel\Facades\Activation;
use Dingo\Api\Http\Request;



class CorporateController extends ApiController
{

    public function __construct()
    {
        $this->middleware(['api.auth','user-corp']);
    }

    /**
     * Send invite to corporate user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendInvite(Request $request){
        $rules = [
            'email_fns' => 'required|string|email|max:255',
        ];

        $this->validateDingo($request,$rules);

        $user = $this->guard()->user();

        $activation = Activation::create($user,'corp-invite');

        event(new CorpInviteGenerate($request->input('email'), $activation->getCode()));

        return $this->response()->created();
    }

}
