<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Corporation extends Model
{

    public $fillable = [
        'email_fns',
        'company_name'
    ];

    public $timestamps = false;

    public function users(){
        return $this->hasMany('App\Models\Entities\Users');
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function getPriceList(){
        return DB::table('base_offers')
            ->select(
                DB::raw('base_offers.id as id, 
                    CASE
                        WHEN (additional_offers.price IS NULL)
                        THEN base_offers.price
                        ELSE additional_offers.price
                    END AS price,
                    name')
            )
            ->leftJoin('additional_offers', function($join){
                $join->on('base_offers.id','=','additional_offers.offer_type')
                    ->where('corp_id','=',$this->id);
            })
            ->get();
    }

    public function getOrderTypesList() {
        return DB::table('order_types')
            ->leftJoin('base_offers', function ($join){
                $join->on('order_types.base_offer_id','=','base_offers.id');
            })
            ->select(
                DB::raw('order_types.id as id, order_types.name, base_offer_id,
                    CASE
                        WHEN (additional_offers.price IS NULL)
                        THEN base_offers.price
                        ELSE additional_offers.price
                    END AS price, order_types.is_org, order_types.prefix')
            )
            ->leftJoin('additional_offers', function($join){
                $join->on('base_offers.id','=','additional_offers.offer_type')
                    ->where('corp_id','=',$this->id);
            })
            ->get();
    }

}
