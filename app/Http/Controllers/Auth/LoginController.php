<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

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
