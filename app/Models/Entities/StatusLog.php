<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class StatusLog extends Model
{
    public function order(){
        return $this->belongsTo('App\Order');
    }
}
