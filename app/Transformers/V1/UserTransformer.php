<?php
/**
 * Created by PhpStorm.
 * User: darevski
 * Date: 26.11.17
 * Time: 23:09
 */

namespace App\Transformers\V1;

use App\Models\Entities\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{

    public function transform(User $user){
        return [
            'id' => (int) $user->id,
            'email' => $user->email,
            'full name' => $user->full_name,
            'corporate' => [
                'id' => (int)$user->corporate->id,
                'email_fns' => $user->corporate->email_fns,
                'company_name' => $user->corporate->company_name,
                'main' => (boolean) $user->is_main_corp,
            ],
            'updated_at' => $user->updated_at,
            'created_at' => $user->created_at,
            'balance' => ($user->corporate->balance),
            'permissions' => ($user->getAllPermissions()),
        ];
    }

}