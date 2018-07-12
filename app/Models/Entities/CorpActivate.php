<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class CorpActivate extends Model
{

    public $fillable = ['activate_code','corp_id'];

    public function corporate(){
        return $this->belongsTo('App\Models\Entities\Corporation','corp_id');
    }
}
