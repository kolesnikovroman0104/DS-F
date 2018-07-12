<?php

namespace App\Models\Entities\Logs;

use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    protected $table = 'users_log';

    public function admin(){
        return $this->belongsTo('App\Models\Entities\User','admin_user_id');
    }

    public function user(){
        return $this->belongsTo('App\Models\Entities\User','modifying_user_id');
    }
}
