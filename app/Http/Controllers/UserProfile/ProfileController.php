<?php

namespace App\Http\Controllers\UserProfile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class ProfileController extends Controller
{
	public function getUserInfo(Request $request)
	{
		return User::where('id', $request->input('id'))->first();
	}

	public function setEmailAndInfo(Request $request)
	{
		$user = $this->getUserInfo($request);
		$validator = Validator::make(
			array('email' => $request->input('email')
		), [
			'email' => 'required|string|email|max:64|unique:users',
		]);
		if ($validator->fails()) {
			return $validator->errors();
		}
		if ($user) {
			$user->fill([
				'email' => $request->input('email'),
				'info' => $request->input('info'),
			])->save();
			return "true";
		}
		return "false";
	}

	public function setPicture(Request $request)
	{
		$rawImgSrc = preg_replace(
				'/^data:image\/\w+;base64,/i', '', $request->input('img')
			);
		$rawImgSrc = str_replace(' ', '+', $rawImgSrc);
		$decodedImg = base64_decode($rawImgSrc);
		return file_put_contents('./profile_pictures/' . time() . 'foof.png', $decodedImg);
	}
}
