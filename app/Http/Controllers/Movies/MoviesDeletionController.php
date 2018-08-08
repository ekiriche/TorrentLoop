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
		// return $request->input('path');
		if ($request->input('path') == '')
			return "NE OK";
		$path = $request->input('path');
		$delete_time = $request->input('timeToDelete');
		$film = Film::where('path', $path)->first();
		if ($film == '')
		{
			Film::create(
				[
					'path' => $path,
					'delete_time' => $delete_time
				]
			);
		}
		else
		{
			$film->fill(
				[
					'upadated_at' => $delete_time
				]
			)->save();
		}
		return "OK";

	}

	public function deleteNotWatchedFilms(Request $request)
	{
		$films = Film::all();
		foreach($films as $key => $item)
		{
			if (now()->timestamp >= $item->delete_time)
			{
				unlink('torrent-stream/' . $item->path);
				$item->delete();
			}
		}
		return "OK";
	}
}
