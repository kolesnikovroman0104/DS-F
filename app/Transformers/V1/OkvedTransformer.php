<?php
/**
 * Created by PhpStorm.
 * User: darevski
 * Date: 26.11.17
 * Time: 23:09
 */

namespace App\Transformers\V1;

use App\Models\Entities\NeededDocs;
use App\Models\Entities\Okved;
use League\Fractal\TransformerAbstract;

class OkvedTransformer extends TransformerAbstract
{

    public function transform(Okved $okved){
        return [
            'id' => (int) $okved->id,
            'name' => $okved->name,
            'code' => $okved->code,
            'childs' => ($okved->childs->isEmpty()) ? false : true,
        ];
    }

}