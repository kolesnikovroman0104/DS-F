<?php

namespace App\Models\Entities\Logs;

use Illuminate\Database\Eloquent\Model;

class TransactionLog extends Model
{
    protected $table = 'transactions';

    public function from(){
        return $this->belongsTo('App\Models\Entities\User','user_from');
    }

    public function to(){
        return $this->belongsTo('App\Models\Entities\User','user_to');
    }
}
