<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Entities\OrderType::class, function (Faker $faker) {
    return [
        'name'=> $faker->companySuffix,
        'default_price' => rand(0,10000),
    ];
});
