<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OrdersDocsTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docs_needed', function (Blueprint $table){
            $table->bigIncrements('id');
            $table->bigInteger('order_id')->unsigned();
            $table->bigInteger('type_id')->unsigned();
            $table->boolean('generated');
            $table->boolean('uploaded');

            $table->foreign('type_id')->references('id')->on('document_types');
            $table->foreign('order_id')->references('id')->on('orders');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('docs_needed', function (Blueprint $table) {
            $table->dropForeign('docs_needed_type_id_foreign');
            $table->dropForeign('docs_needed_order_id_foreign');
        });

        Schema::dropIfExists('docs_needed');
    }
}
