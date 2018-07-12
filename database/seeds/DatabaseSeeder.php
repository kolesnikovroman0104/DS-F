<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RolesPermissionsSeeder::class,
            UsersAndOrderSeeder::class,
            PricesOrderTypesSeeder::class,
            OkvedsSeeder::class,
            StatusesSeeder::class
        ]);
    }
}
