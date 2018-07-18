<?php

namespace App\Http\Controllers\CommentsLikes;

use App\Comment;
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
    return ("ok");
  }

  public function getComments(Request $request)
  {
    return Comment::where('film_id', $request->input('film_id'))->get();
  }
}
