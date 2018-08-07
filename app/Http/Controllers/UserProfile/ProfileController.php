<?php

namespace App\Http\Controllers\UserProfile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
	public function getUserInfo(Request $request)
	{
		return User::where('id', $request->input('id'))->first();
	}

	public function setInfo(Request $request)
	{
		$user = $this->getUserInfo($request);
		$validator = Validator::make($request->all(), [
			'firstname' => 'required|string|max:32|min:2',
			'lastname' => 'required|string|max:32|min:2',
			'email' => 'required|string|email|max:64',
			'info' => 'max:255'
		]);
		if ($validator->fails())
			return $validator->errors();
		$email_validator = Validator::make($request->all(), [
			'email' => 'unique:users'
		]);
		if ($email_validator->fails() && $request->input('email') != $user->email)
			return $email_validator->errors();
		$user->fill([
			'firstname' => $request->input('firstname'),
			'lastname' => $request->input('lastname'),
			'email' => $request->input('email'),
			'info' => $request->input('info')
		])->save();
		return "OK";
	}

	public function setPicture(Request $request)
	{
		$user = $this->getUserInfo($request);
		$rawImgSrc = preg_replace(
				'/^data:image\/\w+;base64,/i', '', $request->input('img')
			);
		$rawImgSrc = str_replace(' ', '+', $rawImgSrc);
		$decodedImg = base64_decode($rawImgSrc);
		$pictureName = "./profile_pictures/" . time() . ".png";
		if ($user) {
			file_put_contents($pictureName, $decodedImg);
			$user->fill([
				'photo' => "http://localhost:8100/" . $pictureName,
			])->save();
			return "true";
		}
		return "false";
	}

	public function setPassword(Request $request)
	{
		$user = $this->getUserInfo($request);
		$validator = Validator::make($request->all(), [
			'password' => 'required|max:32|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/'
		]);
		if ($validator->fails())
			return $validator->errors();
		$user->fill([
			'password' => Hash::make($request->input('password'))
		])->save();
		return "OK";
	}
}
