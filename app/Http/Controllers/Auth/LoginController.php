<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function attemptLogin(Request $request)
    {
        $user = User::where('login', $request->input('login'))->first();
        if ($user == '')
            return "User not found";
        if (Hash::check($request->input('password'), $user->password))
            return "OK";
        return "Password is wrong";
    }
}
