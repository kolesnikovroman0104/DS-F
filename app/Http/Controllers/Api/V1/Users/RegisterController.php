<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Models\Entities\Corporation;
use App\Events\UserRegistered;
use App\Http\Controllers\Api\ApiController;
use App\Transformers\V1\UserTransformer;
use Cartalyst\Sentinel\Laravel\Facades\Activation;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Dingo\Api\Http\Request;
use Illuminate\Foundation\Testing\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


class RegisterController extends ApiController
{

    protected function baseRules(){
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ];
    }


    /**
     * Validation rules for an incoming registration request.
     *
     * @return array
     */
    protected function rules()
    {
        return array_merge($this->baseRules(),[
            'email_fns' => 'required|string|email|max:255',
            'company_name' => 'required|string|max:255'
        ]);
    }

    /**
     * Validation rules for corporate register
     *
     * @return array
     */
    protected function rulesCorp(){
        return array_merge($this->baseRules(),[
            'activate_code' => 'required|string|max:255',
        ]);
    }

    /**
     * Register new user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request){

        $this->validateDingo($request,$this->rules(),[],[],'not valid data');

        event(new UserRegistered($user = Sentinel::register($request->all())));

        $corporate = Corporation::create([
            'email_fns' => $request->input('email_fns'),
            'company_name' => $request->input('company_name')
        ]);

        // Added corporations to users
        $user->corporate()->associate($corporate);
        $user->is_main_corp = true;


        $baseRole = Sentinel::findRoleByName('base-user');
        $corpRole = Sentinel::findRoleByName('corp-user');


        $baseRole->users()->attach($user);
        $corpRole->users()->attach($user);

        $user->save();

        return $this->response()->item($user, new UserTransformer());
    }


    /**
     * Register new corporate user using existing corporation
     *
     * @param Request $request
     * @return $this|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function registerCorp(Request $request){
        $this->validateDingo($request,$this->rulesCorp());

        $activateCode = $request->input('activate_code');

        $mainUser = Activation::getUserByCode($activateCode,'corp-invite');

        if (null == $mainUser){
            throw new NotFoundHttpException('User not exists');
        }

        if (Activation::complete($mainUser,$activateCode,'corp-invite')){

            event(new UserRegistered($user = Sentinel::register($request->all())));
            $user->corporate()->associate($mainUser->corporate);

            $baseRole = Sentinel::findRoleByName('base-user');

            $baseRole->users()->attach($user);

            $user->save();
        }
        else{
            throw new HttpException('Activation code is not active');
        }


        return $this->response()->item($user, new UserTransformer());
    }




}
