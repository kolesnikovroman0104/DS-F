<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;


class CorpInvite extends Mailable
{
    use Queueable, SerializesModels;

    public $activateCode;


    /**
     * UserConfirmation constructor.
     * @param string $activateCode
     */
    public function __construct(string $activateCode)
    {
        $this->activateCode = $activateCode;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.users.corp-invite')->with('activateCode',$this->activateCode);
    }
}
