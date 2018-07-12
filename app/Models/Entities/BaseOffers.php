<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class BaseOffers extends Model
{

    public $timestamps = false;

    protected $fillable = [
        'name',
        'price',
    ];

    public function extended(){
        return $this->hasMany('App\Models\Entities\AdditionalOffers','offer_type');
    }
}
