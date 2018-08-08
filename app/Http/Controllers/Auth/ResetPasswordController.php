<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use App\Http\SendMail\SendMail;
use Illuminate\Support\Facades\Validator;

class ResetPasswordController extends Controller
{
	public function updateOAuth(Request $request)
	{
		$user = User::where('id', $request->input('id'))->first();
		$validator = Validator::make(
			array('password' => $request->input('newpass')
		), [
			'password' => 'required|max:32|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/',
		]);
		if ($validator->fails()) {
			return $validator->errors();
		}
		if ($user) {
			$user->fill([
				'password' => Hash::make($request->input('newpass'))
			])->save();
			return "true";
		}
		return "false";
	}

	public function update(Request $request)
	{
		$user = User::where('id', $request->input('id'))->first();
		if (Hash::check($request->input('oldpass'), $user->password)) {
			$validator = Validator::make(
				array('password' => $request->input('newpass')
			), [
				'password' => 'required|max:32|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/',
			]);
			if ($validator->fails()) {
				return $validator->errors();
			}
			if ($user) {
				$user->fill([
					'password' => Hash::make($request->input('newpass'))
				])->save();
			}
		} else {
			return "Wrong password";
		}
		return "OK";
	}

	public function reset(Request $request)
	{
		$tempPass = strtoupper(substr(hash("sha256", rand(0, 1000)), 0, 10));
		$user = User::where('email', $request->input('email'))->first();
		if ($user) {
			$user->fill([
				'password' => Hash::make($tempPass)
			])->save();
			$sendMail = new SendMail();
			$sendMail->send_mail(
				$user->email,
				$this->_emailContent($tempPass),
				"Password Reset"
			);
			return "OK";
		}
		return "false";
	}

	private function _emailContent($password)
	{
		$message = "<html><head>";
		$message .= "<title>Password reset</title></head>";
		$message .= "<body><h1>Password reset</h1>";
		$message .= "<p>Hello there!</p>";
		$message .= "<p>You resetted your password, so we got you a new one, please change this temporary password to something a little bit more secure.</p>";
		$message .= "<p>Temporary password: $password</p>";
		$message .= "</body></html>";
		return $message;
	}
}
