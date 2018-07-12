<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Api\ApiController;
use App\Models\Entities\Corporation;

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
        /**
         * @var $corporate Corporation
         */
        $corporate = $user->corporate;

        return $corporate->getPriceList()->keyBy('id');
    }

    public function getAllOrderTypes(){
        $user = $this->guard()->user();
        /**
         * @var $corporate Corporation
         */
        $corporate = $user->corporate;
        return $corporate->getOrderTypesList()->keyBy('id');
    }
}