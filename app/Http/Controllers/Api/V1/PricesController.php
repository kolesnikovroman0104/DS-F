<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;

class PricesController extends ApiController
{

    public function __construct()
    {
        $this->middleware('api.auth');
    }

    /**
     *
     *
     * @return mixed
     */
    public function getAll(){

        $user = $this->guard()->user();
        $corporate = $user->corporate;

        return $corporate->getPriceList()->keyBy('id');
    }
}
