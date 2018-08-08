<?php

namespace App\Http\Controllers\Movies;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Done\Subtitles\Subtitles;

class SubtitleController extends Controller
{
	/**
	 * Downloads subtitles to a specific folder,
	 * imdb-id will be the name of the folder
	 *
	 * @param Request $request
	 * @key imdb-id
	 * @return string ("true" or "false")
	 */
	public function downloadSubtitles(Request $request)
	{
		if (!file_exists('movies')) {
			mkdir('movies', 0755, true);
		}

		if (!file_exists('movies/' . $request->input('imdb-id'))) {
			mkdir('movies/' . $request->input('imdb-id'), 0755, true);
		}
		$allSubtitles = $this->_getAllSubtitles($request->input('imdb-id'));
		if ($allSubtitles === "false") {
			return "false";
		}
		$this->_saveSubtitlesToFolder($allSubtitles, $request->input('imdb-id'));
		return json_encode($allSubtitles);
	}

	private function _getAllSubtitles($imdbId)
	{
		$url = 'https://subtitle-api.org/videos/' . $imdbId . '/subtitles';
		$options = array(
			'https' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'GET'
			),
			"ssl"=>array(
				"verify_peer"=>false,
				"verify_peer_name"=>false,
			),
		);

		$context  = stream_context_create($options);
		$result = json_decode(file_get_contents($url, false, $context), TRUE);
		if ($result === FALSE) {
			return "false";
		}
		$items = [];
		foreach ($result['items'] as $item) {
			if (array_search($item['language'], array_column($items, 'language')) === false) {
				$items[] = array(
					'id' => $item['id'],
					'language' => $item['language'],
				);
			}
		}
		return $items;
	}

	private function _saveSubtitlesToFolder(&$allSubtitles, $imdbId)
	{
		foreach ($allSubtitles as $item) {
			try {
				$subtitleString = $this->_getSubtitleString($imdbId, $item['id']);
				$subtitles = Subtitles::load($subtitleString, 'srt');
				$path = 'movies/' . $imdbId . '/' . $item['language'];
				$subtitles->save($path . '.srt');
				Subtitles::convert($path . '.srt', $path . '.vtt');
				unlink($path . '.srt');
			} catch (\Exception $e) {
				// delete invalid subtitle from $allSubtitles array
				unset($allSubtitles[
					array_search($item['id'], array_column($allSubtitles, 'id'))
				]);
				$allSubtitles = array_values($allSubtitles);
			}
		}
	}

	private function _getSubtitleString($imdbId, $subtitleId)
	{
		$url = 'https://subtitle-api.org/videos/' . $imdbId . '/subtitles/' . $subtitleId;
		$options = array(
			'https' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'GET'
			),
			"ssl"=>array(
				"verify_peer"=>false,
				"verify_peer_name"=>false,
			),
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);

		if ($result === FALSE) {
			return "false";
		}
		return $result;
	}
}
