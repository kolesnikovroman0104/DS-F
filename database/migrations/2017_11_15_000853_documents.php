<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Documents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('document_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('svd_reg');
            $table->boolean('tiff_need');
        });


        Schema::create('documents_uploaded', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('type_id')->unsigned()->nullable();
            $table->bigInteger('order_id')->unsigned();
            $table->string('path');
            $table->string('thumb_path');

            $table->foreign('type_id')->references('id')->on('document_types');
            $table->foreign('order_id')->references('id')->on('orders');
        });


        Schema::create('document_models', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('path');
        });


        Schema::create('documents_generated', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('type_id')->unsigned();
            $table->bigInteger('order_id')->unsigned();
            $table->bigInteger('model_id')->unsigned();
            $table->string('path');

            $table->foreign('type_id')->references('id')->on('document_types');
            $table->foreign('model_id')->references('id')->on('document_models');
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
        Schema::table('documents_uploaded', function (Blueprint $table) {
            $table->dropForeign('documents_uploaded_type_id_foreign');
            $table->dropForeign('documents_uploaded_order_id_foreign');
        });


        Schema::table('documents_generated', function (Blueprint $table) {
            $table->dropForeign('documents_generated_type_id_foreign');
            $table->dropForeign('documents_generated_order_id_foreign');
            $table->dropForeign('documents_generated_model_id_foreign');
        });

        Schema::dropIfExists('documents_uploaded');

        Schema::dropIfExists('document_types');
        Schema::dropIfExists('documents_generated');
        Schema::dropIfExists('document_models');

    }
}
