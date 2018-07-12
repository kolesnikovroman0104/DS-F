<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class OrderType extends Model
{
    public $timestamps = false;

    public $fillable = ['name'];

    public function orders(){
        return $this->hasMany('App\Models\Entities\Order');
    }

    public function baseOffer(){
        return $this->hasOne('App\Models\Entities\BaseOffers');
    }
}
