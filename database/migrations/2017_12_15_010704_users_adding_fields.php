<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UsersAddingFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('corporations', function(Blueprint $table) {
            $table->text('company_name');
            $table->renameColumn('email', 'email_fns');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('corporations', function(Blueprint $table) {
           $table->dropColumn('company_name');
           $table->renameColumn('email_fns', 'email');
        });
    }
}
