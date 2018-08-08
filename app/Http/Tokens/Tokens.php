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

	public function getAccessTime($jwt)
	{
		try {
			$token = JWT::decode($jwt, 'secret', (array)'HS512');
			$token_decoded = (array) $token;
			return $token_decoded['exp'];
		}
		catch (\Firebase\JWT\ExpiredException $e)
		{
			return 'expired';
		}
	}

	public function tokenExists($jwt)
	{
		if ($this->getAccessTime($jwt) == 'expired')
			return 'expired';
		$token = (array) JWT::decode($jwt, 'secret', (array)'HS512');
		$user = User::where('id', $token['uid'])->first();
		if ($user == '')
			return "hacker detected";
		else
			return "exists";
	}

	public function getTokenUid($jwt)
	{
		try {
			$token = JWT::decode($jwt, 'secret', (array)'HS512');
			$token_decoded = (array) $token;
			return $token_decoded['uid'];
		}
		catch (\Firebase\JWT\ExpiredException $e)
		{
			return 'expired';
		}
	}
}

?>
