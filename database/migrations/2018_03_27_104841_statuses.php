<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Statuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statuses',function (Blueprint $table){
            $table->bigIncrements('id');
            $table->string('status_name')->nullable();
            $table->string('status_icon_color')->nullable();
            $table->string('status_icon')->nullable();

        });


        Schema::table('orders', function (Blueprint $table){
            $table->bigInteger('status_id')->unsigned()->nullable();
            $table->foreign('status_id')->references('id')->on('statuses');

            $table->dropColumn('status_name');
            $table->dropColumn('status');
            $table->dropColumn('status_color');
            $table->dropColumn('status_border');
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
            $table->dropForeign('orders_status_id_foreign');
            $table->string('status_name')->nullable();
            $table->string('status_color')->nullable();
            $table->integer('status')->default(0);
            $table->string('status_border')->nullable();
        });

        Schema::dropIfExists('statuses');
    }
}
