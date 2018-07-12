<?php
/**
 * Created by PhpStorm.
 * User: darevski
 * Date: 26.11.17
 * Time: 23:09
 */

namespace App\Transformers\V1;

use App\Models\Entities\DocumentUploaded;
use League\Fractal\TransformerAbstract;

class DocumentTransformer extends TransformerAbstract
{

    public function transform(DocumentUploaded $user){
        return [
            'id' => (int) $user->id,
            'email' => $user->email,
            'full name' => $user->full_name,
            'corporate' => [
                'id' => (int)$user->corporate->id,
                'email' => $user->corporate->email,
                'main' => (boolean) $user->is_main_corp,
            ],
            'updated_at' => $user->updated_at,
            'created_at' => $user->created_at,
            'balance' => ($user->balance) ?? 0 .'р.',
            'permissions' => ($user->getAllPermissions()),
        ];
    }

}