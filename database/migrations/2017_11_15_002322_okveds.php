<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Okveds extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('okveds', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('parent_id')->unsigned()->nullable();
            $table->text('name');
            $table->string('code');

            $table->foreign('parent_id')->references('id')->on('okveds');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('okveds', function (Blueprint $table) {
            $table->dropForeign('okveds_parent_id_foreign');
        });

        Schema::dropIfExists('okveds');
    }
}
