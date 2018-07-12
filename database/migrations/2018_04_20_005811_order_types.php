<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OrderTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_types', function(Blueprint $table) {
            $table->renameColumn('default_price', 'base_offer_id');
            $table->foreign('base_offer_id')->references('id')->on('base_offers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_types', function(Blueprint $table) {
            $table->dropForeign('order_types_base_offer_id_foreign');
            $table->renameColumn('base_offer_id', 'default_price');
        });
    }
}
