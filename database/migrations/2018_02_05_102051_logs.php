<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Logs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_log', function (Blueprint $table){
            $table->bigIncrements('id');
            $table->timestamps();
            $table->bigInteger('admin_user_id')->unsigned();
            $table->bigInteger('modifying_user_id')->unsigned();

            $table->integer('action_group');
            $table->string('action_log');

            $table->foreign('admin_user_id')->references('id')->on('users');
            $table->foreign('modifying_user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users_log',function (Blueprint $table){
            $table->dropForeign('users_log_admin_user_id_foreign');
            $table->dropForeign('users_log_modifying_user_id_foreign');

        });

        Schema::dropIfExists('users_log');
    }
}
