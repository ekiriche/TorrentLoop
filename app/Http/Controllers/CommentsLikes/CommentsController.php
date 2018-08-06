<?php

namespace App\Http\Controllers\CommentsLikes;

use App\Comment;
use App\Like;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
	protected function validator(array $data)
	{
		return Validator::make($data, [
			'content' => 'required|string|max:255|min:2',
		]);
	}

	protected function create(array $data)
	{
		return Comment::create([
			'content' => $data['content'],
			'user_id' => $data['user_id'],
			'film_id' => $data['film_id'],
		]);
	}

	public function addComment(Request $request)
	{
		$validator = $this->validator($request->all());

		if ($validator->fails())
		return $validator->errors();
		$this->create($request->all());
		$var = Comment::join('users', 'users.id', '=', 'comments.user_id')
		->select('users.id as user_id', 'users.firstname', 'users.lastname', 'users.photo', 'comments.content', 'comments.id', 'comments.created_at')
		->where('film_id', '=', $request->input('film_id'))
		->get();
		foreach ($var as $key => $item)
		{
			$temp = $this->avgRating($item, $request->input('film_id'));
			$currentUserRating = $this->currentUserRating($item['id'], $request->input('user_id'));
			$var[$key]['avgRating'] = round($temp, 1);
			$var[$key]['currentUserRating'] = $currentUserRating;
		}
		return $var;
	}

	public function getComments(Request $request)
	{
		$var = Comment::join('users', 'users.id', '=', 'comments.user_id')
		->select('users.id as user_id', 'users.firstname', 'users.lastname', 'users.photo', 'comments.content', 'comments.id', 'comments.created_at')
		->where('film_id', '=', $request->input('film_id'))
		->get();
		foreach ($var as $key => $item)
		{
			$temp = $this->avgRating($item, $request->input('film_id'));
			$currentUserRating = $this->currentUserRating($item['id'], $request->input('user_id'));
			$var[$key]['avgRating'] = round($temp, 1);
			$var[$key]['currentUserRating'] = $currentUserRating;
		}
		return $var;
	}

	private function avgRating($comment, $film_id)
	{
		return Comment::join('likes', 'likes.commentId', '=', 'comments.id')
		->where('likes.film_id', $film_id)
		->where('likes.commentId', $comment['id'])
		->avg('rating');
	}
	private function currentUserRating($comment_id, $user_id)
	{
		return Comment::join('likes', 'likes.commentId', '=', 'comments.id')
		->where('comments.id', $comment_id)
		->where('likes.user_id', $user_id)
		->first();
	}
}
/*
public function getComments(Request $request)
{
$var = Comment::join('users', 'users.id', '=', 'comments.user_id')
->select('users.firstname', 'users.lastname', 'users.photo', 'comments.content', 'comments.id', 'comments.created_at')
->where('film_id', '=', $request->input('film_id'))
->get('users.id as user_id');
foreach ($var as $key => $item)
{
$temp = $this->avgRating($item, $request->input('film_id'));
$var[$key]['avgRating'] = round($temp, 1);
}
return $var;
}

private function avgRating($comment, $film_id)
{
return Comment::join('likes', 'likes.commentId', '=', 'comments.id')
->where('likes.film_id', $film_id)
->where('likes.commentId', $comment['id'])
->avg('rating');
}
*/
