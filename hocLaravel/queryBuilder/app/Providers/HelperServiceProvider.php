<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HelperServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        
        // $file = app_path('Helpers/Helper.php');
        // if (file_exists($file)) {
        //     require_once($file);
        // }
        // trường hợp này thì chỉ có một file.

        foreach (glob(app_path() . '/Helpers/*.php') as $file) {
            require_once($file);
        }
        // trường hợp này khi mà có nhiều helper thì chúng ta sẽ như này;
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
