<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class DocumentGenerated extends Model
{
    protected $table = 'documents_generated';

    public $timestamps = false;

    public function order(){
        return $this->belongsTo('App\Models\Entities\Order');
    }

    public function type(){
        return $this->belongsTo('App\Models\Entities\DocumentTypes');
    }

    public function model(){
        return $this->belongsTo('App\Models\Entities\DocumentModels');
    }

    public static function clearOrder(Order $order){
        DocumentGenerated::where('order_id', $order->id)->delete();
    }
}
