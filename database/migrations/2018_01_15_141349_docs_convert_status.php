<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DocsConvertStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documents_uploaded', function (Blueprint $table){
           $table->boolean('is_converted')->default(false);
           $table->string('converted_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('documents_uploaded', function (Blueprint $table){
            $table->dropColumn('is_converted');
            $table->dropColumn('converted_path');
        });
    }
}
