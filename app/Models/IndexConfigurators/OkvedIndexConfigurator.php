<?php

namespace App\Models\IndexConfigurators;

use ScoutElastic\IndexConfigurator;
use ScoutElastic\Migratable;

class OkvedIndexConfigurator extends IndexConfigurator
{
    use Migratable;

    protected $settings = [
        //
    ];

}
