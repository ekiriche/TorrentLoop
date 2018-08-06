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
		$url = "http://localhost:3000/get-stream";

		$torrent = $this->_getDownloadUrl($request->input('imdb-id'), $request->input('quality'));
		// return ($request->input('imdb-id')); //////////////////////////////////////////////////////////////////////////////////////////
		$data = array('torrent' => $torrent, 'imdb' => $request->input('imdb-id'));
		$options = array(
			'http' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'POST',
				'content' => http_build_query($data)
			)
		);
		$context = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		//return "torrent";
		// return json_encode("RETURN FUNCT");
		return $result;
	}

	private function _getDownloadUrl($imdbId, $quality)
	{
		//		return ($quality);

		$url = 'https://yts.am/api/v2/list_movies.json?query_term=' . $imdbId;
		$options = array(
			'https' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'GET'
			)
		);

		$context  = stream_context_create($options);

		$result = json_decode(file_get_contents($url, false, $context), TRUE);

		if ($result === FALSE) {
			return "false";
		}

		return $result['data']['movies'][0]['torrents'][
			array_search(
				$quality,
				array_column($result['data']['movies'][0]['torrents'], 'quality')
				)
				]['url'];
			}

			/**
			* Gets percentage of downloading movie
			*
			* @param Request $request
			* @key imdb-id
			* @return float
			*/
			public function getDownloadPercentage(Request $request)
			{
				$transmission = new Transmission();
				$torrent = $transmission->get($this->_getTorrentHash($request->input('imdb-id')));
				return $torrent->getPercentDone();
			}

			private function _getTorrentHash($imdbId)
			{
				$url = 'https://yts.am/api/v2/list_movies.json?query_term=' . $imdbId;
				$options = array(
					'https' => array(
						'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
						'method'  => 'GET'
					)
				);
				$context  = stream_context_create($options);
				$result = json_decode(file_get_contents($url, false, $context), TRUE);

				if ($result === FALSE) {
					return "false";
				}
				return $result['data']['movies'][0]['torrents'][
					array_search(
						'720p',
						array_column($result['data']['movies'][0]['torrents'], 'quality')
						)
						]['hash'];
					}
				}
