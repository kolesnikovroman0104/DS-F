<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->unique();

            $table->string('password')->nullable();

            $table->bigInteger('balance')->default(0);

            $table->string('new_email')->unique()->default(null)->nullable()->comment('Store not confirmed email');
            $table->boolean('is_email_confirmed')->default(false);
            $table->string('activate_code')->nullable();

            $table->text('permissions')->nullable();
            $table->timestamp('last_login')->nullable();

            $table->timestamps();
            $table->dateTime('password_updated_at')->nullable();


            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
