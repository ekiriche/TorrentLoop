<?php

namespace App\Http\Controllers\UserProfile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\MovieHistory;

class MovieHistoryController extends Controller
{
	public function getHistory(Request $request)
	{
		$history = MovieHistory::where('user_id', $request->input('user-id'))->get();
		return $history;
	}

	public function saveMovieToHistory(Request $request)
	{
		$user = User::where('id', $request->input('id'))->first();
		$history = new MovieHistory();
		if ($user) {
			$history->fill([
				'user_id' => $request->input('id'),
				'imdb_code' => $request->input('imdb-code')
			])->save();
			return "true";
		}
		return "false";
	}
}
