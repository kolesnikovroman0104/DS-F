<?php

namespace App\Models\Entities;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Individual extends Model
{
    public $table = 'individuals';

    public $timestamps = false;

    public $guarded = [
        'id',
        'role_id',
        'order_id',
        'address_id',
        'address',
        'order',
    ];

    public $dates = [
        'birthDate',
        'passportDate',
    ];

    public $dateFormat = 'd.m.Y';

    public function order(){
        return $this->belongsTo('App\Models\Entities\Order');
    }

    public function address(){
        return $this->belongsTo('App\Models\Entities\Addresses');
    }

}
