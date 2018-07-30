<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
  protected $fillable = [
    'imdb_id',
    'updated_at'
  ];
}
