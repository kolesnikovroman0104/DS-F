<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Entities\Order::class, function (Faker $faker){
    return [
        'json' => $faker->ipv6,
        'order_name' => $faker->name(),
    ];
});
