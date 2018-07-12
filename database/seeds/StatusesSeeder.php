<?php

use Illuminate\Database\Seeder;
use App\Models\Entities\Status;

class StatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Status::create([
            'status_name' => 'Заявка не заполнена',
            'status_icon' => 'not-completed-icon.svg',
            'status_icon_color' => '#808080'
        ])->save();

        Status::create([
            'status_name' => 'Ожидание оплаты',
            'status_icon' => 'money-icon.svg',
            'status_icon_color' => '#F1BC00'
        ])->save();

        Status::create([
            'status_name' => 'Пакет проверяется',
            'status_icon' => 'checking-icon.svg',
            'status_icon_color' => '#F1BC00'
        ])->save();

        Status::create([
            'status_name' => 'Заявка отклонена операционистом',
            'status_icon' => 'not-completed-icon.svg',
            'status_icon_color' => '#F64747'
        ])->save();

        Status::create([
            'status_name' => 'Готов к отправке',
            'status_icon' => 'ready-icon.svg',
            'status_icon_color' => '#4CCC80'
        ])->save();

        Status::create([
            'status_name' => 'Заявка отправлена',
            'status_icon' => 'success-icon.svg',
            'status_icon_color' => '#4CCC80'
        ])->save();

        Status::create([
            'status_name' => 'Пакет в очереди на загрузку на портал ФНС',
            'status_icon' => 'refresh-icon.svg',
            'status_icon_color' => '#F1BC00'
        ])->save();

        Status::create([
            'status_name' => 'Пакет загружен на портал ФНС',
            'status_icon' => 'refresh-icon.svg',
            'status_icon_color' => '#4CCC80'
        ])->save();

        Status::create([
            'status_name' => 'Поставлена в очередь на обработку',
            'status_icon' => 'clock-icon.svg',
            'status_icon_color' => '#F1BC00'
        ])->save();

        Status::create([
            'status_name' => 'Заявка принята к исполнению',
            'status_icon' => 'clock-icon.svg',
            'status_icon_color' => '#4CCC80'
        ])->save();

        Status::create([
            'status_name' => 'Принято решение об отказе в регистрации',
            'status_icon' => 'not-completed-icon.svg',
            'status_icon_color' => '#F64747'
        ])->save();

        Status::create([
            'status_name' => 'Регистрация пройдена',
            'status_icon' => 'handshake-icon.svg',
            'status_icon_color' => '#4CCC80'
        ])->save();

    }
}
