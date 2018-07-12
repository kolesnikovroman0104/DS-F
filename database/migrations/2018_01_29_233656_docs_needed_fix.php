<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DocsNeededFix extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docs_needed', function (Blueprint $table){
            $table->bigInteger('model_id')->unsigned()->nullable();

            $table->foreign('model_id')->references('id')->on('document_models');

        });

        Schema::create('user_models', function (Blueprint $table){
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('model_id')->unsigned();
            $table->bigInteger('type_id')->unsigned();

            $table->foreign('model_id')->references('id')->on('document_models');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('type_id')->references('id')->on('document_types');

        });

        Schema::table('document_types', function (Blueprint $table){
            $table->bigInteger('model_id')->unsigned();
            $table->foreign('model_id')->references('id')->on('document_models');
        });
    }



    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('document_types', function (Blueprint $table){
            $table->dropForeign('document_types_model_id_foreign');
            $table->dropColumn('model_id');
        });

        Schema::table('user_models', function (Blueprint $table){
            $table->dropForeign('user_models_model_id_foreign');
            $table->dropForeign('user_models_user_id_foreign');
            $table->dropForeign('user_models_type_id_foreign');
        });

        Schema::dropIfExists('user_models');

        Schema::table('docs_needed', function (Blueprint $table){
            $table->dropForeign('docs_needed_model_id_foreign');
            $table->dropColumn('model_id');
        });
    }
}
