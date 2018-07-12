<?php

namespace App\Http\Controllers\Api\V1\AdminArea;

use App\AdditionalOffers;
use App\Corporation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PricesController extends Controller
{
    /**
     * PricesController constructor.
     */
    public function __construct()
    {
        $this->middleware('api.auth');
    }

    public function setPrice(Request $request){
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
