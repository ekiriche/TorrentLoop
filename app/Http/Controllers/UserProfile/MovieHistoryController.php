<?php

namespace App\Http\Controllers\UserProfile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\MovieHistory;
use App\Http\Tokens\Tokens;
use Illuminate\Support\Facades\DB;

class MovieHistoryController extends Controller
{
	public function getHistory(Request $request)
	{
		/*$token = new Tokens();
		$uid = $token->getTokenUid($request->input('jwt'));
		$history = MovieHistory::where('user_id', $uid)->orderBy('updated_at', 'desc')->get();
		return $history;*/
		return MovieHistory::where('user_id', $request->input('user_id'))->orderBy('updated_at', 'desc')->get();
	}

	public function saveMovieToHistory(Request $request)
	{
	/*	$token = new Tokens();
		$uid = $token->getTokenUid($request->input('jwt'));
		$user = User::where('id', $uid)->first();
		$history = new MovieHistory();
		if ($user) {
			$existed = $history->where('imdb_code', $request->input('imdb_code'))->where('user_id', $uid)->first();
			if ($existed)
				$existed->increment('watch');
			else
			$history->fill([
				'user_id' => $uid,
				'movie_id' => $request->input('movie_id'),
				'imdb_code' => $request->input('imdb_code'),
				'medium_cover_image' => $request->input('medium_cover_image'),
				'title_english' => $request->input('title_english'),
				'year' => $request->input('year'),
				'rating' => $request->input('rating'),
				'watch' => 0
			])
			->save();
			return "true";
		}
		return "false";
	} */
			$user = User::where('id', $request->input('user_id'))->first();
			if ($user == '')
				return 'false';
			$history = MovieHistory::where('user_id', $request->input('user_id'))->where('imdb_code', $request->input('imdb_code'))->first();
			if ($history == '')
			{
				MovieHistory::create([
					'user_id' => $request->input('user_id'),
					'movie_id' => $request->input('movie_id'),
					'imdb_code' => $request->input('imdb_code'),
					'medium_cover_image' => $request->input('medium_cover_image'),
					'title_english' => $request->input('title_english'),
					'year' => $request->input('year'),
					'rating' => $request->input('rating'),
					'watch' => 0
				]);
			}
			return "true";
		}
}
