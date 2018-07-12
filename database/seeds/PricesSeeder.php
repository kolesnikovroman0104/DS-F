<?php

use Illuminate\Database\Seeder;

class PricesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Models\Entities\BaseOffers::class,20)->create()->each(function ($u){
            $additionalPrice = \App\Models\Entities\AdditionalOffers::create(['price' => rand(10,2000)]);
            $additionalPrice->corporation()->associate(\App\Models\Entities\Corporation::first());

            $u->extended()->save($additionalPrice);

            $u->save();
        });
    }
}
