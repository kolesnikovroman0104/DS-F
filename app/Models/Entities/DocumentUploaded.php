<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class DocumentUploaded extends Model
{
    protected $table = 'documents_uploaded';

    public $timestamps = false;

    public function order(){
        return $this->belongsTo('App\Models\Entities\Order');
    }

    public function type(){
        return $this->belongsTo('App\Models\Entities\DocumentTypes');
    }
}
