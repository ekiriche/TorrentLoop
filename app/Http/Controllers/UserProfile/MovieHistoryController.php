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
		$history = MovieHistory::where('user_id', $request->input('user-id'))->get();
		return $history;
	}

	public function saveMovieToHistory(Request $request)
	{
		// return $request;
		$token = new Tokens();
		$uid = $token->getTokenUid($request->input('jwt'));
		// return $uid;
		$user = User::where('id', $uid);
		$history = new MovieHistory();
		if ($user) {
			$existed = $history->where('imdb_code', $request->input('imdb_code'))->first();
			if (!$existed)
			$history->fill([
				'user_id' => $uid,
				'imdb_code' => $request->input('imdb_code'),
				'medium_cover_image' => $request->input('medium_cover_image'),
				'title_english' => $request->input('title_english'),
				'year' => $request->input('year'),
				'rating' => $request->input('rating')
			])
			->save();
			return "true";
		}
		return "false";
	}
}
