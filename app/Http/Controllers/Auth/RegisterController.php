<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'login' => 'required|string|max:16|min:4|unique:users',
            'firstname' => 'required|string|max:32|min:2',
            'lastname' => 'required|string|max:32|min:2',
            'email' => 'required|string|email|max:64|unique:users',
            'password' => 'required|string|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/',
        ]);
    }

    protected function create(array $data)
    {
        return User::create([
            'login' => $data['login'],
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function attemptRegister(Request $request)
    {
      $validator = $this->validator($request->all());
      if ($validator->fails())
        return $validator->errors();
      $this->create($request->all());
      return "OK";
    }
}
