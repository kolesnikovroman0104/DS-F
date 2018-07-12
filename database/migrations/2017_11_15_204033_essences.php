<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Essences extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses',function (Blueprint $table){
            $table->bigIncrements('id');
            $table->string('full');
            $table->string('index');
            $table->string('area_type');
            $table->string('area');
            $table->string('settlement_type');
            $table->string('settlement');
            $table->string('city_type');
            $table->string('city');
            $table->string('street_type');
            $table->string('street');
            $table->string('tax_type');
            $table->string('house_type_full');
            $table->string('house');
            $table->string('block_type_full');
            $table->string('block');
            $table->string('flat_type_full');
            $table->string('flat');
            $table->string('tax_office');
        });

        Schema::create('essence_roles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->boolean('major_role')->default(false);
        });


        Schema::create('legal_entities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('role_id')->unsigned()->nullable();
            $table->bigInteger('order_id')->unsigned()->nullable();
            $table->bigInteger('address_id')->unsigned()->nullable();
            $table->text('name');
            $table->text('short_name');
            $table->text('inn');
            $table->text('ogrn');
            $table->text('ogrnDate');


            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('role_id')->references('id')->on('essence_roles');
            $table->foreign('address_id')->references('id')->on('addresses');
        });

        Schema::create('individuals',function (Blueprint $table){
            $table->bigIncrements('id');
            $table->string('gender');
            $table->string('citizenship');
            $table->string('surname');
            $table->string('name');
            $table->string('patronymic');
            $table->string('birthPlace');
            $table->date('birthDate');
            $table->date('passportDate');
            $table->string('passportSerial');
            $table->string('passportNumber');
            $table->string('passportComment');
            $table->string('passportUnit');
            $table->string('snils');
            $table->string('inn');
            $table->bigInteger('role_id')->unsigned()->nullable();
            $table->bigInteger('order_id')->unsigned()->nullable();
            $table->bigInteger('address_id')->unsigned()->nullable();

            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('role_id')->references('id')->on('essence_roles');
            $table->foreign('address_id')->references('id')->on('addresses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {


        Schema::table('legal_entities', function (Blueprint $table) {
            $table->dropForeign('legal_entities_order_id_foreign');
            $table->dropForeign('legal_entities_role_id_foreign');
            $table->dropForeign('legal_entities_address_id_foreign');
        });
        Schema::table('individuals', function (Blueprint $table) {
            $table->dropForeign('individuals_role_id_foreign');
            $table->dropForeign('individuals_order_id_foreign');
            $table->dropForeign('individuals_address_id_foreign');
        });

        Schema::dropIfExists('addresses');
        Schema::dropIfExists('legal_entities');
        Schema::dropIfExists('individuals');
        Schema::dropIfExists('essence_roles');
    }
}
