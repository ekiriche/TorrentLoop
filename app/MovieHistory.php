<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MovieHistory extends Model
{
	protected $fillable = [
		'user_id', 'imdb_code'
	];
}
