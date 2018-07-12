<?php

namespace App\Models\Entities;

use App\Models\IndexConfigurators\OrderIndexConfigurator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use ScoutElastic\Searchable;


class Order extends Model
{
    use Searchable;

    protected $indexConfigurator = OrderIndexConfigurator::class;

    protected $searchRules = [
        //
    ];

    protected $mapping = [
        'properties' => [
            'id' => [
                'type' => 'integer',
                'index' => 'true',
            ],
            'order_name' => [
                'type' => 'text',
                'analyzer' => 'russian',
            ]
        ]
    ];

    public $fillable = ['json'];

    public function user(){
        return $this->belongsTo('App\Models\Entities\User');
    }

    public function orderType(){
        return $this->belongsTo('App\Models\Entities\OrderType');
    }

    public function uploadedDocuments(){
        return $this->hasMany('App\Models\Entities\DocumentUploaded');
    }

    public static function getAllOrders($searchQuery = null){
        if ($searchQuery)
            $orders = Order::search($searchQuery)->where('user_id', Auth::guard()->id());
        else
            $orders = Auth::guard()->user()->orders();

        return $orders;
    }

    public static function getAllOrdersAdmin($searchQuery = null){
        if ($searchQuery)
            $orders = Order::search($searchQuery);
        else
            //small hack
            $orders = Order::with('user');

        return $orders;
    }

    public function individuals(){
        return $this->hasMany('App\Models\Entities\Individual');
    }


    public function status(){
        return $this->belongsTo('App\Models\Entities\Status');
    }


    public function neededDocs(){
        return $this->hasMany('App\Models\Entities\NeededDocs');
    }

    public function legalEntities(){
        return $this->hasMany('App\Models\Entities\Individual');
    }
}
