<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class LegalEntities extends Model
{
    public $table = 'legal_entities';

    public $timestamps = false;

    protected $guarded = [
        'id',
        'role_id',
        'order_id',
        'address_id',
        'address',
        'order',
    ];


    public function order(){
        return $this->belongsTo('App\Models\Entities\Order');
    }

    public function address(){
        return $this->belongsTo('App\Models\Entities\Addresses');
    }
}
