<?php

use Illuminate\Database\Seeder;
use App\Models\Entities\BaseOffers;
use App\Models\Entities\OrderType;

class PricesOrderTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BaseOffers::create([
            'name' => 'Единоразовая подготовка документов',
            'price' => '200'
        ])->save();

        BaseOffers::create([
            'name' => 'Месяц подготовки документов',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Отправка документов регистрация ИП',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Отправка документов регистрация ООО',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Отправка документов внесение изменений ИП',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Отправка документов внесение изменений ООО (13001)',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Отправка документов внесение изменений ООО (14001)',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Отправка документов ликвидация ИП (26001)',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Подготовка документов регистрация ИП',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Подготовка документов регистрация ООО',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Подготовка документов внесение изменений ИП',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Подготовка документов внесение изменений ООО (13001)',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Подготовка документов внесение изменений ООО (14001)',
            'price' => '2000'
        ])->save();

        BaseOffers::create([
            'name' => 'Подготовка документов ликвидация ИП (26001)',
            'price' => '2000'
        ])->save();

        OrderType::create([
            'name' => 'Отправка документов регистрация ИП',
            'base_offer_id' =>  BaseOffers::where('name', 'Отправка документов регистрация ИП')->first()->id,
            'is_org' => '0',
            'prefix' => 'ИП'
        ])->save();

        OrderType::create([
            'name' => 'Отправка документов регистрация ООО',
            'base_offer_id' =>  BaseOffers::where('name', 'Отправка документов регистрация ООО')->first()->id,
            'is_org' => '1',
            'prefix' => 'ООО'
        ])->save();

        OrderType::create([
            'name' => 'Отправка документов внесение изменений ИП',
            'base_offer_id' =>  BaseOffers::where('name', 'Отправка документов внесение изменений ИП')->first()->id,
            'is_org' => '0',
            'prefix' => 'Внес. Изм. ИП'
        ])->save();

        OrderType::create([
            'name' => 'Отправка документов внесение изменений ООО (13001)',
            'base_offer_id' =>  BaseOffers::where('name', 'Отправка документов внесение изменений ООО (13001)')->first()->id,
            'is_org' => '1',
            'prefix' => 'Внес. Изм. ООО'
        ])->save();

        OrderType::create([
            'name' => 'Отправка документов внесение изменений ООО (14001)',
            'base_offer_id' =>  BaseOffers::where('name', 'Отправка документов внесение изменений ООО (14001)')->first()->id,
            'is_org' => '1',
            'prefix' => 'Внес. Изм. ООО'
        ])->save();

        OrderType::create([
            'name' => 'Отправка документов ликвидация ИП (26001)',
            'base_offer_id' =>  BaseOffers::where('name', 'Отправка документов ликвидация ИП (26001)')->first()->id,
            'is_org' => '0',
            'prefix' => 'Ликв. ИП'
        ])->save();

        OrderType::create([
            'name' => 'Подготовка документов регистрация ИП',
            'base_offer_id' =>  BaseOffers::where('name', 'Подготовка документов регистрация ИП')->first()->id,
            'is_org' => '0',
            'prefix' => 'ИП'
        ])->save();

        OrderType::create([
            'name' => 'Подготовка документов регистрация ООО',
            'base_offer_id' =>  BaseOffers::where('name', 'Подготовка документов регистрация ООО')->first()->id,
            'is_org' => '1',
            'prefix' => 'ООО'
        ])->save();

        OrderType::create([
            'name' => 'Подготовка документов внесение изменений ИП',
            'base_offer_id' =>  BaseOffers::where('name', 'Подготовка документов внесение изменений ИП')->first()->id,
            'is_org' => '0',
            'prefix' => 'Внес. Изм. ИП'
        ])->save();

        OrderType::create([
            'name' => 'Подготовка документов внесение изменений ООО (13001)',
            'base_offer_id' =>  BaseOffers::where('name', 'Подготовка документов внесение изменений ООО (13001)')->first()->id,
            'is_org' => '1',
            'prefix' => 'Внес. Изм. ООО'
        ])->save();

        OrderType::create([
            'name' => 'Подготовка документов внесение изменений ООО (14001)',
            'base_offer_id' =>  BaseOffers::where('name', 'Подготовка документов внесение изменений ООО (14001)')->first()->id,
            'is_org' => '1',
            'prefix' => 'Внес. Изм. ООО'
        ])->save();

        OrderType::create([
            'name' => 'Подготовка документов ликвидация ИП (26001)',
            'base_offer_id' =>  BaseOffers::where('name', 'Подготовка документов ликвидация ИП (26001)')->first()->id,
            'is_org' => '0',
            'prefix' => 'Ликв. ИП'
        ])->save();



    }
}
