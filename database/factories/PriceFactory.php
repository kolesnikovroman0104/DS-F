<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Entities\BaseOffers::class, function (Faker $faker) {
    return [
        'price' => rand(10,200),
        'name' => $faker->companySuffix,
    ];
});