<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ExtendOrdersType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_types', function (Blueprint $table){
            $table->boolean('is_org')->nullable();
            $table->string('prefix')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_types', function (Blueprint $table){
            $table->dropColumn('is_org');
            $table->dropColumn('prefix');
        });
    }
}
