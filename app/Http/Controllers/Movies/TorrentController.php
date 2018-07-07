<?php

namespace App\Http\Controllers\Movies;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Done\Subtitles\Subtitles;
use Transmission\Transmission;
use Transmission\Client;

class TorrentController extends Controller
{
	public function downloadMovie(Request $request)
	{
		if (!file_exists('movies')) {
			mkdir('movies', 0755, true);
		}
		if (!file_exists('movies/' . $request->input('imdb-id'))) {
			mkdir('movies/' . $request->input('imdb-id'), 0755, true);
		}
		$transmission = new Transmission();
		$session = $transmission->getSession();
		$session->setDownloadDir('/movies/' . $request->input('imdb-id'));
		$session->save();
		/* if (file_exists('./movies/' . $request->input('imdb-id') . '/' */
		/* 	. $request->input('imdb-id') . '.torrent')) { */
		/* 	return "exists"; */
		/* } */

		/* $torrent = $transmission->add( */
		/* 	'./movies/' . $request->input('imdb-id') . '/' */
		/* 	. $request->input('imdb-id') . '.torrent' */
		/* ); */

		/* if (file_exists( */
		/* 	'./movies/' . $request->input('imdb-id') . */
		/* 	'/Back to the Future (1985) [BluRay] [1080p] [YTS.AM].torrent' */
		/* )) { */
		/* 	return "exists"; */
		/* } */

		$torrent = $transmission->add(
			'./movies/' . $request->input('imdb-id') .
			'/Back to the Future (1985) [BluRay] [1080p] [YTS.AM].torrent'
		);
		/* return './movies/' . $request->input('imdb-id') . '/' */
		/* 	. $request->input('imdb-id') . '.torrent'; */
		return "true";
	}
}
