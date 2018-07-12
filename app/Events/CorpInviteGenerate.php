<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CorpInviteGenerate
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $email;
    public $activateCode;

    /**
     * CorpInviteGenerate constructor.
     * @param string $email
     * @param string $activateCode
     */
    public function __construct(string $email, string $activateCode)
    {
        $this->email = $email;
        $this->activateCode = $activateCode;
    }

    /**user
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
