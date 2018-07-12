<?php

namespace App\Mail;

use App\Models\Entities\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;


class UserConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public $activate;

    /**
     * Create a new message instance.
     * userConfirmation constructor.
     * @param User $user
     * @return void
     */
    public function __construct(User $user, $activate)
    {
        $this->user = $user;
        $this->activate = $activate;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.users.confirm')->with(['user'=>$this->user,'activate'=>$this->activate]);
    }
}
