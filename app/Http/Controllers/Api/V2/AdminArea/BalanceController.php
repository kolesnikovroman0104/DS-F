<?php

namespace App\Http\Controllers\Api\V2\AdminArea;

use App\Http\Controllers\Api\ApiController;
use App\Models\Entities\User;
use Dingo\Api\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use League\Flysystem\Exception;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BalanceController extends ApiController
{

    public function __construct()
    {
        $this->middleware('api.auth');
    }


    public function addMoney(Request $request){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');


        $rules = [
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|integer',
            'comment' => 'string|max:512',
        ];

        $this->validateDingo($request,$rules);

        $user = User::find($request->input('user_id'));

        $comment = ($request->has('comment')) ? $request->input('comment') : '';
        DB::enableQueryLog();
        try{
            $user->increaseBalance($amount = $request->input('amount'), $comment);
        }
        catch (Exception $e){
            Log::critical(['Exception' => $e, 'User'=>$user->id, 'message'=> "balance increase for $amount with $comment failed"]);
            throw new HttpException('500','eternal error try again latter');
        }
        dd(DB::getQueryLog());
        return $this->response()->created();
    }
}
