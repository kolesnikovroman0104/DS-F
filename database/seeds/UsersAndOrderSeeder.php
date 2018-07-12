<?php

use Illuminate\Database\Seeder;
use \Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use \Cartalyst\Sentinel\Laravel\Facades\Activation;

use \App\Models\Entities\Corporation;
use \App\Models\Entities\User;
use \App\Models\Entities\Order;

class UsersAndOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Default user for postman using
        $postman = User::create([
            'email'=>'postman@postman.com',
            'password'=> bcrypt('postman'),
            'first_name'=> 'postman',
            'last_name'=>'postman'
        ]);

//        factory(Order::class,5)->create()->each(function ($o) use($postman){
//            $o->user()->associate($postman);
//            $orderType = \App\Models\Entities\OrderType::inRandomOrder()->first();
//            $o->orderType()->associate($orderType);
//            $o->save();
//        });


        //factory(\App\Models\Entities\OrderType::class,50)->create();

        factory(User::class,5)->create()->each(function ($u){
            $u->corporate()->associate(Corporation::create([
                'email_fns' => 'test_fsn@gmail.com',
                'company_name' => 'OOO ds'
            ]));
            $u->is_main_corp = true;
            $baseRole = Sentinel::findRoleByName('base-user');
            $corpRole = Sentinel::findRoleByName('corp-user');


            $baseRole->users()->attach($u);
            $corpRole->users()->attach($u);

            $u->save();

            $activation = Activation::create($u);
            Activation::complete($u,$activation->code);

        });



    }
}