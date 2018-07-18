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
			return "User is not found";
		if ($user->access_level == 0)
			return "Email is not verificated";
		if (Hash::check($request->input('password'), $user->password))
		{
			$token = new Tokens();
			$jwt = $token->createAccessToken($user->id, 86400);
			return $jwt;
		}
		return "Password is wrong";
	}

	public function updateAccessToken(Request $request)
	{
		$user = User::where('id', $request->input('id'))->first();
		$token = new Tokens();
		$jwt = $token->createAccessToken($user->id, 86400);
		return $jwt;
	}

	public function checkAccessToken(Request $request)
	{
		$token = new Tokens();
		return $token->tokenExists($request->input('jwt'));
	}
}
