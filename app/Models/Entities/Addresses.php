<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class Addresses extends Model
{
    public $table = 'addresses';

    public $guarded = ['id'];

    public $timestamps = false;

    public function individuals(){
        return $this->hasOne('App\Models\Entities\Individual');
    }

    public function legalEntities(){
        return $this->hasOne('App\Models\Entities\LegalEntities');
    }
}
