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
      Like::create([
        'user_id' => $request->input('user_id'),
        'target_id' => $request->input('target_id'),
      ]);
      Comment::where('id', $request->input('target_id'))->increment('likes');
      return "OK";
    }

    public function removeLike(Request $request)
    {
      Like::where('user_id', $request->input('user_id'))->where('target_id', $request->input('target_id'))->delete();
      Comment::where('id', $request->input('target_id'))->decrement('likes');
      return "OK";
    }

    public function getLikes(Request $request)
    {
      return Like::all();
    }
}
