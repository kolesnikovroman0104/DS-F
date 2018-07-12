<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use ScoutElastic\Searchable;
use App\Models\IndexConfigurators\OkvedIndexConfigurator;

class Okved extends Model
{
    use Searchable;

    public $timestamps = false;

    protected $indexConfigurator = OkvedIndexConfigurator::class;

    protected $searchRules = [
        //
    ];

    protected $mapping = [
        'properties' => [
            'id' => [
                'type' => 'integer',
                'index' => 'true',
            ],
            'name' => [
                'type' => 'text',
                'analyzer' => 'russian',
            ],
            'code' => [
                'type' => 'text',
            ]
        ]
    ];


    public function parent(){
        return $this->belongsTo('App\Models\Entities\Okved');
    }

    public function childs(){
        return $this->hasMany('App\Models\Entities\Okved','parent_id','id');
    }
}
