<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    function register(Request $request)
    {
        $validator  = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|confirmed|min:6',
            ],
            [
                'email.unique' => 'email đã được dùng'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $user = User::create(
            array_merge(
                $validator->validated(),
                ['password' => bcrypt($request->password)]
            )
        );
        return response()->json(
            [
                'msg' => "User successfullly registered",
                'user' => $user
            ],
            201

        );
    }

    function login(Request $request)
    {

        $validator  = Validator::make(
            $request->all(),
            [

                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$token =  auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }
    public function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'token',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function profile()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json([
            'msg' => 'User logged out'
        ]);
    }
}
