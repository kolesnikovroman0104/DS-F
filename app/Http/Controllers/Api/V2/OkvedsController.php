<?php

namespace App\Http\Controllers\Api\V2;

use App\Models\Entities\NeededDocs;
use App\Models\Entities\DocumentTypes;
use App\Models\Entities\DocumentUploaded;
use App\Http\Controllers\Api\ApiController;
use App\Jobs\ImageOptimaze;
use App\Models\Entities\Okved;
use App\Models\Entities\Order;
use App\Services\ImageService;
use App\Transformers\V1\DocNeedToUpload;
use App\Transformers\V1\OkvedTransformer;
use \Dingo\Api\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class OkvedsController extends ApiController
{
    public function __construct()
    {
        $this->middleware('api.auth');
    }


    public function rules(){
        return [
            'order_id' => 'required|int|exists:orders,id',
        ];
    }

    /**
     * Upload document
     * @param Request $request
     * @return string
     */
    public function getLevel(Request $request, Okved $okved) {
        if ($okved->id) {
            return $this->response()->collection($okved->childs, new OkvedTransformer());
        } else {
            return $this->response()->collection(Okved::whereNull('parent_id')->get(), new OkvedTransformer());
        }
    }

    public function search(Request $request){
        return $this->response()->collection(Okved::search($request->input('search'))->get(), new OkvedTransformer());
    }
}
