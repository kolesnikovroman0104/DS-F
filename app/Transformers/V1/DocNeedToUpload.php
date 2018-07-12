<?php
/**
 * Created by PhpStorm.
 * User: darevski
 * Date: 26.11.17
 * Time: 23:09
 */

namespace App\Transformers\V1;

use App\Models\Entities\NeededDocs;
use League\Fractal\TransformerAbstract;

class DocNeedToUpload extends TransformerAbstract
{

    public function transform(NeededDocs $docs){
        return [
            'id' => (int) $docs->id,
            'order_id' => $docs->order_id,
            'type_id' => $docs->type_id,
            'generated' => $docs->generated,
            'uploaded' => $docs->uploaded,
            'model_id' => $docs->model_id,
        ];
    }

}