<?php

namespace App\Http\Controllers\Api\V2\AdminArea;

use App\Http\Controllers\Api\ApiController;
use App\Jobs\DocumentGenerate;
use App\Models\Entities\DocumentGenerated;
use App\Models\Entities\NeededDocs;
use App\Models\Entities\Order;
use App\Models\OrdersUpdate;
use App\Transformers\V1\OrderTransformer;
use Dingo\Api\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class OrdersController extends ApiController
{

    public function __construct()
    {
        $this->middleware('api.auth');
    }


    public function rules(){
        return [
            'json' => 'required',
            'order_type_id' => 'required|int|exists:order_types,id',
        ];
    }

    /**
     * @param Request $request
     * @return \Dingo\Api\Http\Response
     */
    public function getAllOrders(Request $request){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');

            $orders = Order::getAllOrdersAdmin($request->input('search'))->paginate(15);
        return $this->response()->paginator($orders, new OrderTransformer());
    }

    /**
     * @param Request $request
     * @return array
     */
    public function getOrdersCount(Request $request){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');

        $count = Order::getAllOrdersAdmin($request->input('search'))->count();;
        return response()->json(['count'=>$count]);
    }



    /**
     * @param Order $order
     * @return \Dingo\Api\Http\Response
     */
    public function updateOrder(Request $request ,Order $order){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');

        $updateRules = [
            'json' => 'required',
            'json.individuals.*.name' => 'required|string',
            'json.individuals.*.surname' => 'required|string',
            'json.individuals.*.patronymic' => 'required|string',
        ];

        $this->validateDingo($request,$updateRules);

        $json = $request->json;
        $json['order_id'] = $order->id;

        $order->order_name = $this->createOrderName($json);

        $order->json = \GuzzleHttp\json_encode($json);
        $order->save();

        OrdersUpdate::update($order, $json);

        $docs = $this->getNeededDocs($order);

        return response()->json(['order_id'=>$order->id,'needed_docs'=> $docs]);
    }

    /**
     * @param Order $order
     * @return array|Collection
     */
    public function getNeededDocs(Order $order){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');

        $fractal = new Manager();
        $docsList = NeededDocs::getUploaded($order);
        $docs = new Collection($docsList, function (NeededDocs $doc){
            return [
                'id' => (int) $doc->id,
                'type_id' => $doc->type_id,
                'type_name' => $doc->type->name,
            ];
        });
        $resultList = $fractal->createData($docs)->toArray();

        return $resultList;
    }


    public function updateGenerate(Request $request, Order $order){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');

        $response =  $this->updateOrder($request,$order);

        $docs = NeededDocs::getGenerated($order);
        //Delete all existing generated documents
        DocumentGenerated::clearOrder($order);

        foreach ($docs as $doc){
            // Run generating in different jobs
            DocumentGenerate::dispatch($order, $doc);
        }

        return $response;
    }

    /**
     * @param Order $order
     * @return \Dingo\Api\Http\Response
     */
    public function getOrder(Order $order){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');

        return $this->response()->item($order, new OrderTransformer());
    }


    /**
     * @param Order $order
     * @return \Dingo\Api\Http\Response
     */
    public function deleteOrder(Order $order){
        if (!$this->checkPermission([]))
            throw new AccessDeniedHttpException('Your don`t have any permissions');

        $order->delete();
        return $this->response()->noContent();
    }


    /**
     * Create order name from request json info
     * @param $inputJson
     * @param string $prefix
     * @param bool $isOrg
     * @return string
     */
    protected function createOrderName($inputJson, $prefix = '', $isOrg = false){
        $orderName = $inputJson['order_id'];

        foreach ($inputJson['individuals'] as $element){
            $orderName = $element['name'].' '.
                $element['surname'].' '.
                $element['patronymic'];
        }

        return $prefix.$orderName;
    }
}
