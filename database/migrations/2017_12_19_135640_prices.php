<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Prices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('offers', function (Blueprint $table) {
            $table->dropForeign('offers_corp_id_foreign');
            $table->dropForeign('offers_type_id_foreign');
        });

        Schema::dropIfExists('offers');

        Schema::create('base_offers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->bigInteger('price');
        });

        Schema::create('additional_offers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('offer_type')->unsigned()->nullable();
            $table->bigInteger('price');
            $table->bigInteger('corp_id')->unsigned()->nullable();

            $table->foreign('corp_id')->references('id')->on('corporations');
            $table->foreign('offer_type')->references('id')->on('base_offers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('additional_offers', function (Blueprint $table) {
            $table->dropForeign('additional_offers_offer_type_foreign');
            $table->dropForeign('additional_offers_corp_id_foreign');
        });

        Schema::dropIfExists('additional_offers');
        Schema::dropIfExists('base_offers');


        Schema::create('offers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('corp_id')->unsigned();
            $table->bigInteger('type_id')->unsigned();
            $table->bigInteger('price');
            $table->foreign('corp_id')->references('id')->on('corporations');
            $table->foreign('type_id')->references('id')->on('order_types');
        });
    }
}