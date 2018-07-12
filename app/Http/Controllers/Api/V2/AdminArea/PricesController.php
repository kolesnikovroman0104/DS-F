<?php

namespace App\Http\Controllers\Api\V2\AdminArea;

use App\Http\Controllers\Api\ApiController;
use App\Models\Entities\AdditionalOffers;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class PricesController extends ApiController
{
    /**
     * PricesController constructor.
     */
    public function __construct()
    {
        $this->middleware('api.auth');
    }

    public function setPrice(Request $request){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');

        $rules = [
            'offer_type' => 'required|string|exists:base_offers,id',
            'corp_id' => 'required|string|exists:corporation,id',
            'price' => 'required|integer',
        ];

        $this->validate($request,$rules);

        AdditionalOffers::create([
            'corp_id'=>$request->input('corp_id'),
            'offer_type' => $request->input('offer_type'),
            'price' => $request->input('price'),
        ]);
    }
}
