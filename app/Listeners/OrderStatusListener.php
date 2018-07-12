<?php

namespace App\Listeners;

use App\Events\OrderStatus;
use App\Models\Entities\StatusLog;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderStatusListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  OrderStatus  $event
     * @return void
     */
    public function handle(OrderStatus $event)
    {
        $log = new StatusLog();
        $log->order()->associate($event->order);
        $event->order->status = $event->status;
        $event->order->save();
        $log->status = $event->status;
        $log->save();
    }
}
