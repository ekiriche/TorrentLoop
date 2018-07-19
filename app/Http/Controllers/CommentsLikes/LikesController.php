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
        return 'ok';
    }


    public function getLikes(Request $request)
    {
      return Like::all();
    }
}
