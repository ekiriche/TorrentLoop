<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login', 'firstname', 'lastname', 'email', 'password', 'access_level', 'reg_link', 'access_token'
    ];

/*
    protected $hidden = [
        'password', 'remember_token',
    ];*/
}
