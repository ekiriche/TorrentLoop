<?php

namespace App\Http\Controllers\Movies;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Done\Subtitles\Subtitles;
use Transmission\Transmission;
use Transmission\Client;

class TorrentController extends Controller
{
	/**
	 * Downloads movie from torrent url to a specific folder,
	 * imdbid will be the name of the folder
	 *
	 * @param Request $request
	 * @key imdbid
	 * @return string ("true" or "false")
	 */
	public function downloadMovie(Request $request)
	{
		if (!file_exists('movies')) {
			mkdir('movies', 0755, true);
		}
		if (!file_exists('movies/' . $request->input('imdbid'))) {
			mkdir('movies/' . $request->input('imdbid'), 0755, true);
		}
		$pwd = substr(`pwd`, 0, -1);
		$transmission = new Transmission();
		$session = $transmission->getSession();
		$session->setDownloadDir($pwd . '/movies/' . $request->input('imdbid'));
		/* $session->setDownloadDir('/tmp/movies/' . $request->input('imdbid')); */
		$session->save();
		$torrent = $transmission->add($this->_getDownloadUrl($request->input('imdbid')));
		return "true";
	}

	private function _getDownloadUrl($imdbId)
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
		]['url'];
	}

	/**
	 * Gets percentage of downloading movie
	 *
	 * @param Request $request
	 * @key imdbid
	 * @return float
	 */
	public function getDownloadPercentage(Request $request)
	{
		$transmission = new Transmission();
		$torrent = $transmission->get($this->_getTorrentHash($request->input('imdbid')));
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
