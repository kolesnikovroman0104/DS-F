<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CorpActivate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('corp_activates',function (Blueprint $table){
            $table->bigIncrements('id');
            $table->text('activate_code');
            $table->bigInteger('corp_id')->unsigned()->nullable();
            $table->timestamps();

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
        Schema::table('corp_activates',function (Blueprint $table){
            $table->dropForeign('corp_activates_corp_id_foreign');
        });

        Schema::dropIfExists('corp_activates');
    }
}
