<?php

use Illuminate\Database\Seeder;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;

class RolesPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Sentinel::getRoleRepository()->createModel()->create([
            'name' => 'base-user',
            'slug' => 'base-user',
        ]);

        Sentinel::getRoleRepository()->createModel()->create([
            'name' => 'corp-user',
            'slug' => 'corp-user',
        ]);
    }
}
