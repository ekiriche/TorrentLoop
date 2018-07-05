<?php

namespace App\Http\Tokens;
use \Firebase\JWT\JWT;
use App\User;

class Tokens
{
  public function createAccessToken($user_id, $expireTime)
  {
    $accessTime = time() + $expireTime;
    $user = User::where('id', $user_id)->first();
    if ($user == '')
      return "User not found";
    $token = array(
			"iss" => "http://localhost:8100/",
			"uid" => $user_id,
			"exp" => $accessTime
		);
    $jwt = JWT::encode($token, "secret", 'HS512');
    $user->access_token = $jwt;
    $user->save();
    return $jwt;
  }
}

?>
