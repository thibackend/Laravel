<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $user;
    function __construct()
    {
        $this->user = new User();
    }

    public function createUSer(Request $request)
    {
        if (!empty($request->all())) {
            $data = $request->all();
            $this->user->storeUser($data);
        }
    }
    public function getUsers()
    {
        return $this->user->getAllUsers();
    }
}
