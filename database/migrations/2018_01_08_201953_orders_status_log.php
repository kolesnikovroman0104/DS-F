<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OrdersStatusLog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('status_log',function (Blueprint $table){
            $table->bigIncrements('id');
            $table->bigInteger('order_id')->unsigned();
            $table->string('status')->nullable();
            $table->foreign('order_id')->references('id')->on('orders');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table){
           $table->dropColumn('status');
        });

        Schema::table('status_log',function (Blueprint $table){
            $table->dropForeign('status_log_order_id_foreign');
        });

        Schema::dropIfExists('status_log');
    }
}
