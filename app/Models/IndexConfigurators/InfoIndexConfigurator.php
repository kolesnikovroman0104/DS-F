<?php

namespace App\Models\IndexConfigurators;

use ScoutElastic\IndexConfigurator;
use ScoutElastic\Migratable;

class InfoIndexConfigurator extends IndexConfigurator
{
    use Migratable;

    protected $settings = [
        //
    ];
}
