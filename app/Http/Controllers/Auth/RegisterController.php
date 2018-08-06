<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\SendMail\SendMail;
use App\Http\Tokens\Tokens;

class RegisterController extends Controller
{
	protected function validator(array $data)
	{
		return Validator::make($data, [
			'login' => 'required|string|max:16|min:4|unique:users',
			'firstname' => 'required|string|max:32|min:2',
			'lastname' => 'required|string|max:32|min:2',
			'email' => 'required|string|email|max:64|unique:users',
			'password' => 'required|max:32|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/',
		]);
	}

	protected function create(array $data, $hashed_link)
	{
		return User::create([
			'login' => $data['login'],
			'firstname' => $data['firstname'],
			'lastname' => $data['lastname'],
			'email' => $data['email'],
			'password' => Hash::make($data['password']),
			'reg_link' => $hashed_link,
			'photo' => "http://localhost:8100/default_photo.png"
		]);
	}

	public function attemptRegister(Request $request)
	{
		$validator = $this->validator($request->all());
		if ($validator->fails())
			return $validator->errors();

		$hashed_link = hash("sha256", rand(0, 1000));
		$this->create($request->all(), $hashed_link);
		$SendMail = new SendMail();
		return $SendMail->send_mail($request->input('email'), "Click on the link to confirm your account: http://localhost:8100/auth/confirm?email=" . $request->input('email') . "&reg_link=" . $hashed_link, "User creation");
	}

	public function confirmViaEmail()
	{
		$user = User::where('email', $_GET['email'])->first();
		if ($user == '')
			return "User not found";
		if ($user->reg_link != $_GET['reg_link'])
			return "Reg link is wrong";
		$user->access_level = 1;
		$user->save();
		header("Location: http://localhost:8100");
		die();
	}

	public function oauthRegister(Request $request)
	{
		$user = User::where('email', $request->input('email'))->first();
		if (!$user) {
      $filename = './profile_pictures/' . time() . '.png';
      $img = file_get_contents($request->input('img'));
      file_put_contents($filename, $img);
      $filename = "http://localhost:8100/" . $filename;
      User::create([
				'login' => $request->input('email'),
				'firstname' => $request->input('firstname'),
				'lastname' => $request->input('lastname'),
				'email' => $request->input('email'),
        'photo' => $filename,
				'access_level' => 1,
			]);
		}
		$user = User::where('email', $request->input('email'))->first();
		$token = new Tokens();
		$jwt = $token->createAccessToken($user->id, 1800);
		return $jwt;
	}
}
