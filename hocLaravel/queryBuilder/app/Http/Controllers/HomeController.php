<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    function index()
    {
        // $user = DB::select('select * from users');

        // $user = DB::select('select * from users where id= ?', [2]);
        $user = DB::select('SELECT * FROM users WHERE email=:email', ["email" => 'thi.a24technology@gmail.com']);
        dd($user);
    }
}
