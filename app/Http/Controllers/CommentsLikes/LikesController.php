<?php

namespace App\Http\Controllers\CommentsLikes;

use Illuminate\Http\Request;
use App\Like;
use App\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class LikesController extends Controller
{
    public function addLike(Request $request)
    {
        $isSet = Like::where('user_id', $request->input('user_id'))
        ->where('commentId', $request->input('commentId'))
        ->select('id')->first();
        if ($isSet != '')
            return ;
        Like::create([
            'user_id' => $request->input('user_id'),
            'rating' => $request->input('rating'),
            'commentId' => $request->input('commentId'),
            'film_id' => $request->input('film_id')
        ]);
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

    public function getLikes(Request $request)
    {
      return Like::all();
    }
}
