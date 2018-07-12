<?php

namespace App\Models\IndexConfigurators;

use ScoutElastic\IndexConfigurator;
use ScoutElastic\Migratable;

class OrderIndexConfigurator extends IndexConfigurator
{
    use Migratable;

    protected $settings = [
        //
    ];
}