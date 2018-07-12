<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class NeededDocs extends Model
{
    protected $table = 'docs_needed';

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

    public static function getUploaded(Order $order){
        return $order->neededDocs()->where('uploaded',true)->with('type')->get();
    }

    public static function getGenerated(Order $order){
        return $order->neededDocs()->where('generated',true)->with('type')->get();
    }


    public static function fillDocs(Order $order){
        //self::getModelByType();
        return;
    }

    /**
     * Get model for specified document type considering user exception models
     *
     * @param DocumentTypes $type
     * @return \Illuminate\Support\Collection
     */
    public static function getModelByType(DocumentTypes $type){
        return DB::table('document_types')
            ->select(
                DB::raw('
                    CASE
                        WHEN (b.model_id IS NOT NULL)
                        THEN b.model_id
                        ELSE a.model_id
                    END 
                    AS model_id'
                )
            )
            ->leftJoin('user_models', function ($join){
                $join->on('document_types.id','=','user_models.type_id');
            })
            ->where('user_models.user_id','=',Auth::id())
            ->where('document_types.id','=',$type->id)
            ->get();
    }


}
