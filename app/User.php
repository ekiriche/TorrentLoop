<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
	use Notifiable;

	protected $fillable = [
		'login', 'firstname', 'lastname', 'email', 'password', 'photo', 'info', 'lang', 'access_level', 'reg_link', 'access_token'
	];
}
