<?php

namespace App\Http\Controllers\Api\V2\AdminArea;

use App\Http\Controllers\Api\ApiController;
use App\Models\Entities\Logs\UserLog;
use App\Models\Entities\User;
use App\Transformers\V1\UserTransformer;
use Dingo\Api\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class UsersController extends ApiController
{

    public function __construct()
    {
        $this->middleware('api.auth');
    }

    /**
     * Return users paginated list
     * @param Request $request if param exists using full-text search by users
     * @return \Dingo\Api\Http\Response
     */
    public function getList(Request $request){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');

        $users = ($query = $request->input('search')) ? User::search($query)->paginate(15) : User::paginate(15);

        return $this->response()->paginator($users, new UserTransformer());
    }

    /**
     * Set new email for specified user
     * @param Request $request
     * @return \Dingo\Api\Http\Response
     */
    public function setEmail(Request $request){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');


        $rules = [
            'new-email' => 'required|string|email|max:255',
            'user_id' => 'required|exists:users,id',
        ];

        $this->validateDingo($request,$rules);

        $user = User::find($request->input('user_id'));
        $oldEmail = $user->email;
        $user->email = $newEmail = $request->input('new-email');
        $user->save();

        $log = new UserLog();
        $log->admin()->associate(Auth::user());
        $log->user()->associate($user);
        $log->action_group = 1;
        $log->action_log = "Changed user email from $oldEmail to $newEmail";
        $log->save();

        return $this->response()->created();
    }
}
