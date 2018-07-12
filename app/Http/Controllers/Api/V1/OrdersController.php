<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use App\Models\Entities\Order;
use App\Models\Entities\OrderType;
use App\Transformers\V1\OrderTransformer;
use Dingo\Api\Http\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;


class OrdersController extends ApiController
{

    public function __construct()
    {
        $this->middleware('api.auth');
    }


    public function rules(){
        return [
            'json' => 'required|string|json',
            'order_type_id' => 'required|string|exists:order_types,id',
        ];
    }

    /**
     * @param Request $request
     * @return \Dingo\Api\Http\Response
     */
    public function getAllOrders(Request $request){
        if ($search = $request->input('search'))
            Order::search($search)->where('user_id', $this->guard()->id())->paginate(15);
        else
            $orders = $this->guard()->user()->orders()->paginate(15);

        return $this->response()->paginator($orders, new OrderTransformer());
    }

    /**
     * @param Request $request
     * @return array
     */
    public function getOrdersCount(Request $request){
        // if exist some search query we use scout
        if ($search = $request->input('search'))
            $count = Order::search($search)->where('user_id', $this->guard()->id())->get()->count();
        // in another way we use user orders
        else
            $count = $this->guard()->user()->orders()->get()->count();

        return array('count'=>$count);
    }


    /**
     * @param Request $request
     * @return \Dingo\Api\Http\Response
     */
    public function createOrder(Request $request){
        $this->validateDingo($request,$this->rules());

        $type = OrderType::find($request->input('order_type_id'));

        $order = Order::create($request->all());
        $order->user()->associate($this->guard()->user());
        $order->orderType()->associate($type);
        $order->order_name = $this->createOrderName($request);

        $json = \GuzzleHttp\json_decode($request->input('json'),true);
        $json['id'] = $order->id;
        $order->json = \GuzzleHttp\json_encode($json);


        $order->save();

        return response()->json(['order_id'=>$order->id]);
    }


    /**
     * @param Order $order
     * @return \Dingo\Api\Http\Response
     */
    public function updateOrder(Order $order){
        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t update not your order');

        $this->validateDingo($request = \Illuminate\Http\Request::instance(),$this->rules());

        $order->json = $request->input('json');
        $order->order_name = $this->createOrderName($request);
        $order->save();

        return $this->response()->noContent();
    }


    /**
     * @param Order $order
     * @return \Dingo\Api\Http\Response
     */
    public function getOrder(Order $order){
        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t get not your order');

        $order->load('user');
        return $this->response()->item($order, new OrderTransformer());
    }


    /**
     * @param Order $order
     * @return \Dingo\Api\Http\Response
     */
    public function deleteOrder(Order $order){
        if ($this->guard()->user()->cant('using',$order))
            throw new AccessDeniedHttpException('Your can`t delete not your order');

        $order->delete();

        return $this->response()->noContent();
    }

    /**
     * Create order name from request json info
     * @param $request
     * @param string $prefix
     * @param bool $is_org
     * @return string
     */
    protected function createOrderName($request, $prefix = '', $is_org = false){

        $params = \GuzzleHttp\json_decode($request->input('json'),true);

        if ($is_org)
            $orderName = $params['companyName'];
        else
            $orderName = $params['name'].' '.
                $params['surname'].' '.
                $params['patronymic'];

        return $prefix.$orderName;
    }

}
