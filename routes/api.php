<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


$api = app('Dingo\Api\Routing\Router');

$api->version('v2', ['namespace'=>'App\Http\Controllers\Api\V2', 'middleware'=>'api'], function($api) {
    $api->any('orders/get-all','OrdersController@getAllOrders');


    $api->get('orders/get-count','OrdersController@getOrdersCount');
    $api->post('orders/add-one','OrdersController@createOrder');

    $api->group(['middleware' => 'bindings'], function($api){
        $api->get('orders/get/{order}','OrdersController@getOrder');
        $api->post('orders/update/{order}','OrdersController@updateOrder');
        $api->post('orders/update-generate/{order}','OrdersController@updateGenerate');
        $api->get('orders/delete/{order}','OrdersController@deleteOrder');
    });

    //DOCS
    $api->post('docs/upload','DocsUploadController@uploadDoc');
    $api->post('docs/update-type/{order}/','DocsUploadController@updateDocumentType');
    $api->post('docs/delete/{order}/','DocsUploadController@deleteDoc');
    $api->get('docs/thumb/{order}/{document}',['as' => 'doc.thumb', 'uses'=>'DocsUploadController@getThumb']);
    $api->get('docs/get/{order}/','DocsUploadController@getAllDocuments');

    $api->get('docs/show-needed/{order}/','DocsUploadController@getNeededDocs');


    // Okveds
    $api->get('okveds/get-level/{okved}','OkvedsController@getLevel');
    $api->get('okveds/search/','OkvedsController@search');
    $api->get('okveds/get-level/','OkvedsController@getLevel');


    //Admin
    $api->group(['namespace'=>'\AdminArea'],function ($api){
        $api->get('/admin-area/users/get-all','UsersController@getList');
        $api->post('/admin-area/users/set-email/','UsersController@setEmail');
        $api->post('/admin-area/balance/add-money/','BalanceController@addMoney');


        $api->group(['middleware' => 'bindings'], function($api){
            $api->get('/admin-area/orders/get/{order}','OrdersController@getOrder');
            $api->post('/admin-area/orders/update/{order}','OrdersController@updateOrder');
            $api->post('/admin-area/orders/update-generate/{order}','OrdersController@updateGenerate');
            $api->get('/admin-area/orders/delete/{order}','OrdersController@deleteOrder');
        });

        $api->any('/admin-area/orders/get-all/','OrdersController@getAllOrders');
    });

    // USERS
    $api->get('user/logout','Users\AuthenticateController@logout');
    $api->get('user/refresh-token','Users\AuthenticateController@refreshToken');
    $api->get('user/info','Users\AuthenticateController@getUser');

    // Settings
    $api->post('user/send-invite','Users\CorporateController@sendInvite');

    $api->post('settings/change-password','Users\SettingsController@changePassword');
    $api->post('settings/change-email','Users\SettingsController@changeEmail');
    $api->post('settings/change-fns-email','Users\SettingsController@changeFsnEmail');




    // Orders
// TODO : write middleware for only users orders
    $api->get('orders/get-all','OrdersController@getAllOrders');


    $api->get('orders/get-count','OrdersController@getOrdersCount');
    $api->post('orders/add-one','OrdersController@createOrder');

    $api->group(['middleware' => 'bindings'], function($api){
        $api->get('orders/get/{order}','OrdersController@getOrder');
        $api->post('orders/update/{order}','OrdersController@updateOrder');
        $api->get('orders/delete/{order}','OrdersController@deleteOrder');
        $api->get('orders/delete/{order}','OrdersController@getOrderDocument');
    });

    $api->get('prices/get','PricesController@getAll');
    $api->get('prices/get-order-types','PricesController@getAllOrderTypes');



    $api->post('user/register','Users\RegisterController@register');
    $api->post('user/register-corp','Users\RegisterController@registerCorp');
    $api->post('user/login','Users\AuthenticateController@authenticate');

});

$api->version('v1', ['namespace'=>'App\Http\Controllers\Api\V1', 'middleware'=>'api'], function($api){

    // USERS
    $api->get('user/logout','Users\AuthenticateController@logout');
    $api->get('user/refresh-token','Users\AuthenticateController@refreshToken');
    $api->get('user/info','Users\AuthenticateController@getUser');

    // Settings
    $api->post('user/send-invite','Users\CorporateController@sendInvite');

    $api->post('settings/change-password','Users\SettingsController@changePassword');
    $api->post('settings/change-email','Users\SettingsController@changeEmail');
    $api->post('settings/change-fns-email','Users\SettingsController@changeFsnEmail');




    // Orders
// TODO : write middleware for only users orders
    $api->get('orders/get-all','OrdersController@getAllOrders');


    $api->get('orders/get-count','OrdersController@getOrdersCount');
    $api->post('orders/add-one','OrdersController@createOrder');

    $api->group(['middleware' => 'bindings'], function($api){
        $api->get('orders/get/{order}','OrdersController@getOrder');
        $api->post('orders/update/{order}','OrdersController@updateOrder');
        $api->get('orders/delete/{order}','OrdersController@deleteOrder');
        $api->get('orders/delete/{order}','OrdersController@getOrderDocument');
    });

    $api->get('prices/get','PricesController@getAll');



    $api->post('user/register','Users\RegisterController@register');
    $api->post('user/register-corp','Users\RegisterController@registerCorp');
    $api->post('user/login','Users\AuthenticateController@authenticate');

});

// TODO : need to write middleware which check active user or not
