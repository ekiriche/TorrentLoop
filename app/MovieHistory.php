<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MovieHistory extends Model
{
	protected $fillable = [
		'user_id',
		'imdb_code',
		'medium_cover_image',
		'title_english',
		'year',
		'rating',
		'movie_id',
		'watch'
	];
}
