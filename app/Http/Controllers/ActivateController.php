<?php

namespace App\Http\Controllers;

use Cartalyst\Sentinel\Laravel\Facades\Activation;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Http\Request;

class ActivateController extends Controller
{
    /**
     * @param Request $request
     * @return $this|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function userActivate(Request $request){

        $rules = [
            'id' => 'required|int',
            'token' => 'required|string|max:255',
        ];

        $this->validateDingo($request,$rules);

        $user = Sentinel::findById($request->input('user_id'));

        if(Sentinel::complete($user,$request->input('token'))){
            return view('users.registration.complete');
        }

        return view('users.registration.incomplete')->with(['message'=>'Указанный код активации недействительный']);

    }


    /**
     * Show page where user can register corporate account
     *
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function corpUserRegisterShowForm(Request $request){
        return view()->with([
            'token'=>$request->input('activate_code'),
            'id'=>$request->input('id'),
        ]);
    }


    /**
     * @param Request $request
     * @return $this|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function emailChangeConfirmation(Request $request){

        if ($user = Activation::getUserByCode($request->input('token'))){
            $user->email = $user->new_email;
            $user->save();
            // TODO : LOG this acstion

            return view('users.settings.email-change.complete');
        }
        return view('users.settings.email-change.incomplete')->with(['message'=>'Указанный токен невалиден']);
    }
}
