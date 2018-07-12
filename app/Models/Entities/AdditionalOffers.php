<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class AdditionalOffers extends Model
{
    protected $fillable = [
        'price',
    ];

    public $timestamps = false;

    public function base(){
        return $this->belongsTo('App\Models\Entities\BaseOffers','offer_type');
    }

    public function corporation(){
        return $this->belongsTo('App\Models\Entities\Corporation','corp_id');
    }
}
