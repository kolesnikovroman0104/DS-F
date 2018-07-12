<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Requests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->bigInteger('default_price')->unsigned();

        });

        Schema::create('corporations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('email');
        });

        Schema::create('offers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('corp_id')->unsigned();
            $table->bigInteger('type_id')->unsigned();
            $table->bigInteger('price');
            $table->foreign('corp_id')->references('id')->on('corporations');
            $table->foreign('type_id')->references('id')->on('order_types');
        });


        Schema::table('users',function (Blueprint $table){
            $table->bigInteger('corp_id')->unsigned()->nullable();
            $table->boolean('is_main_corp')->default(false);
            $table->foreign('corp_id')->references('id')->on('corporations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('users',function (Blueprint $table){
            $table->dropForeign('users_corp_id_foreign');
        });


        Schema::table('offers', function (Blueprint $table) {
            $table->dropForeign('offers_corp_id_foreign');
            $table->dropForeign('offers_type_id_foreign');
        });

        Schema::dropIfExists('corp_users');
        Schema::dropIfExists('offers');
        Schema::dropIfExists('corporations');
        Schema::dropIfExists('order_types');
    }
}
