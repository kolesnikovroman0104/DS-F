<?php

namespace App\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTGuardListener
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


    public function attempting($event){
        $result = JWTAuth::attempt($event->credentials);
    }

    public function invalidate($event){
        JWTAuth::invalidate();
    }

    /**
     * @param $events
     */
    public function subscribe($events){
        $events->listen(
            'App\Events\JWTGuard\Attempting',
            'App\Listeners\JWTGuardListener@attempting'
        );

        $events->listen(
            'App\Events\JWTGuard\Invalidating',
            'App\Listeners\JWTGuardListener@invalidate'
        );
    }
}
