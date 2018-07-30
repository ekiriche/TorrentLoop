<?php

namespace App\Http\Controllers\Movies;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Film;

class MoviesDeletionController extends Controller
{

  public function removeDirectory($dir)
  {
    $files = array_diff(scandir($dir), array('.','..'));
    foreach ($files as $file) {
      is_dir("$dir/$file") ? $this->removeDirectory("$dir/$file") : unlink("$dir/$file");
    }
    return rmdir($dir);

  }

  public function addFilmToDB(Request $request)
  {
    $imdb_id = $request->input('imdb-id');
    $film = Film::where('imdb_id', $imdb_id)->first();
    if ($film == '')
    {
      Film::create([
        'imdb_id' => $imdb_id
      ]);
    }
    else
    {
      $film->fill([
        'updated_at' => now()
      ])->save();
    }
    return "OK";
  }

  public function deleteNotWatchedFilms(Request $request)
  {
    $films = Film::all();
    foreach($films as $key => $item)
    {
      if (now()->timestamp - $item->updated_at->timestamp >= 2592000)
      {
        if (is_dir("torrent-stream/public/downloaded_movies/" . $item->imdb_id))
          $this->removeDirectory("torrent-stream/public/downloaded_movies/" . $item->imdb_id);
        $item->delete();
      }
    }
    return "OK";
  }
}
