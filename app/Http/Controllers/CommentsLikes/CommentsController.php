<?php

namespace App\Http\Controllers\CommentsLikes;

use Illuminate\Http\Request;
use App\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    public function addComment(Request $request)
    {
      $validator = Validator::make($request->all(), [
        'content' => 'required|string|max:255'
      ]);
      if ($validator->fails())
        return $validator->errors();
      Comment::create([
        'user_id' => $request->input('user_id'),
        'film_id' => $request->input('film_id'),
        'content' => $request->input('content')
      ]);
      return "OK";
    }
}
