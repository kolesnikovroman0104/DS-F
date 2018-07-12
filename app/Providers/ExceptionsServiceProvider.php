<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ExceptionsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        // Instead 500 error set 404 not found code for non-existent model
        app('Dingo\Api\Exception\Handler')->register(function (\Illuminate\Database\Eloquent\ModelNotFoundException $exception) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
        });
    }
}
