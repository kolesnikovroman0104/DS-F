<?php

namespace App\Policies;

use App\Models\Entities\Order;
use App\Models\Entities\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
    use HandlesAuthorization;

    public function using(User $user,Order $order){
        return ($user->id == $order->user_id) ?? false;
    }
}
