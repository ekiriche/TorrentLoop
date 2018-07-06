<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Http\Tokens\Tokens;
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
		$user = User::where('login', $request->input('login'))->first();
		if ($user == '')
			return "User is not found";
		if ($user->access_level == 0)
			return "Email is not verificated";
		if (Hash::check($request->input('password'), $user->password))
		{
			$token = new Tokens();
			$jwt = $token->createAccessToken($user->id, 1800);
			return $jwt;
		}
		return "Password is wrong";
	}

	public function updateAccessToken(Request $request)
	{
		$user = User::where('login', $request->input('login'))->first();
		$jwt = $token->createAccessToken($user->id, 1800);
	}
}
