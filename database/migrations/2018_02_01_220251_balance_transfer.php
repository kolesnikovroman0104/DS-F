<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BalanceTransfer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('corporations',function(Blueprint $table){
            $table->bigInteger('balance')->default(0);
        });

        Schema::table('users',function(Blueprint $table){
            $table->dropColumn('balance');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users',function(Blueprint $table){
            $table->bigInteger('balance')->default(0);
        });

        Schema::table('corporations',function(Blueprint $table){
            $table->dropColumn('balance');
        });
    }
}
