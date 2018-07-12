<?php

namespace App\Models\Entities;

use App\Models\IndexConfigurators\OrderIndexConfigurator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use ScoutElastic\Searchable;


class Status extends Model
{
    public $table = 'statuses';

    public $timestamps = false;

    public function order(){
        return $this->hasMany('App\Models\Entities\Order');
    }

}
