<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Transcations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('user_from')->unsigned();
            $table->bigInteger('user_to')->unsigned();
            $table->timestamps();
            $table->bigInteger('amount');
            $table->string('comment');

            $table->foreign('user_from')->references('id')->on('users');
            $table->foreign('user_to')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign('transactions_user_from_foreign');
            $table->dropForeign('transactions_user_to_foreign');
        });

        Schema::dropIfExists('transactions');
    }
}
