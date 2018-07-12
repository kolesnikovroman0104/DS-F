<?php

namespace App\Listeners;

use App\Events\CorpInviteGenerate;
use App\Events\UserEmailChanged;
use App\Events\UserRegistered;
use App\Mail\CorpInvite;
use App\Mail\UserConfirmation;
use App\Mail\UserEmailChangeConfirmation;
use Cartalyst\Sentinel\Laravel\Facades\Activation;
use Illuminate\Contracts\Mail\Mailer;


class UserActionListener
{

    protected $mailer;

    /**
     * Create the event listener.
     * @param Mailer $mailer
     */
    public function __construct(Mailer $mailer)
    {
        $this->mailer = $mailer;
    }


    public function onUserRegister(UserRegistered $event){
        $activate = Activation::create($event->user);

        $this->mailer->to($event->user->email)->send(new UserConfirmation($event->user,$activate));

    }

    public function onUserEmailChange(UserEmailChanged $event){
        $this->mailer->to($event->user->new_email)->send(new UserEmailChangeConfirmation($event->user));
    }

    public function sendCorpInvite(CorpInviteGenerate $event){
        $this->mailer->to($event->email)->send(new CorpInvite($event->activateCode));
    }

    /**
     * @param $events
     */
    public function subscribe($events){
        $events->listen(
            'App\Events\UserRegistered',
            'App\Listeners\UserActionListener@onUserRegister'
        );

        $events->listen(
            'App\Events\UserEmailChanged',
            'App\Listeners\UserActionListener@onUserEmailChange'
        );

        $events->listen(
            'App\Events\CorpInviteGenerate',
            'App\Listeners\UserActionListener@sendCorpInvite'
        );
    }
}
