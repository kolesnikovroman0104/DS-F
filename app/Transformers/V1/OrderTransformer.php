<?php
/**
 * Created by PhpStorm.
 * User: darevski
 * Date: 26.11.17
 * Time: 23:09
 */

namespace App\Transformers\V1;

use App\Models\Entities\Order;
use League\Fractal\TransformerAbstract;

class OrderTransformer extends TransformerAbstract
{

    public function transform(Order $order){

        return [
            'id' => (int) $order->id,
            'order_name' => $order->order_name,
            'status' => $order->status,
            'json' => $order->json,
            'request_type' => 'todo',
            'updated_at' => $order->updated_at,
            'created_at' => $order->created_at,
        ];
    }

}