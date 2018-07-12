<?php

use Illuminate\Database\Seeder;
use App\Models\Entities\Okved;

class OkvedsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $okveds = json_decode(File::get(base_path('database/seeds/okveds.json')), true);

        foreach($okveds as $main_code => $main_value) {
            Okved::create([
                'name' => $main_value['name'],
                'code' => $main_code,
            ])->save();

            foreach($main_value['children'] as $sub_okved_code => $sub_okved_value) {

                Okved::create([
                    'name' => $sub_okved_value['name'],
                    'code' => $sub_okved_code,
                    'parent_id' => Okved::where('code', $main_code)->first()->id
                ])->save();

                if (isset($sub_okved_value['children'])) {
                    foreach ($sub_okved_value['children'] as $sub_sub_okved_code => $sub_sub_value) {

                        Okved::create([
                            'name' => $sub_sub_value['name'],
                            'code' => $sub_sub_okved_code,
                            'parent_id' => Okved::where('code', $sub_okved_code)->first()->id
                        ])->save();

                    }
                }

            }

        }


    }
}
