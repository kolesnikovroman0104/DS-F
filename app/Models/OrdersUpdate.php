<?php

namespace App\Models;


use App\Models\Entities\Addresses;
use App\Models\Entities\Individual;
use App\Models\Entities\LegalEntities;
use App\Models\Entities\Order;

class OrdersUpdate
{

    /**
     * @var $individuals Individual[]
     */
    protected $individuals;

    /**
     * @var $individuals LegalEntities[]
     */
    protected $legalEntities;

    /**
     * @var $order Order
     */
    protected $order;

    protected function __construct(Order $order)
    {
        $this->order = $order;

        $this->legalEntities = $order->legalEntities;

        $this->individuals = $order->individuals;
    }


    /**
     * Update address & order id for chosen entity
     * @param $className - entity class name (Individuals or LegalEntities)
     * @param $entities
     */
    protected function updateEntities($className,$entities){

        foreach ($entities as $entity){
            /**
             * @var $ent LegalEntities
             */
            $ent = $className::create($entity);

            $address = Addresses::create($entity['address']);
            $ent->address()->associate($address);
            $ent->order()->associate($this->order);
            $ent->save();
        }

    }

    /**
     * Delete all addresses associated with entity
     * @param $entities
     */
    protected function deleteAddresses($entities){
        foreach ($entities as $entity){
            $address = $entity->address;
            $entity->delete();
            $address->delete();
        }
    }

    /**
     * @param Order $order
     * @param array $json
     */
    public static function update(Order $order, array $json){
        $object = new OrdersUpdate($order);

        if (!empty($json['legal_entities'])){
            $object->deleteAddresses($object->legalEntities);
            $object->updateEntities('App\Models\Entities\LegalEntities',$json['legal_entities']);
        }


        if (!empty($json['individuals']))
            $object->deleteAddresses($object->individuals);
            $object->updateEntities('App\Models\Entities\Individual',$json['individuals']);

    }


    /**
     * TODO: roles update
     */
    protected function roles(){

    }
}
