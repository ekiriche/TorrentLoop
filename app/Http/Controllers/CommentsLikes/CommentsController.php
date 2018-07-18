<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentsLikesController extends Controller
{
  protected function validator(array $data)
  {
    return Validator::make($data, [
      'inputText' => 'required|string|max:255|min:2',
    ]);
  }

  protected function create(array $data)
  {
    return Comment::create([
      'inputText' => $data['inputText'],
    ]);
  }

  public function addNewComment(Request $request)
  {
    $validator = $this->validator($request->all());
    if ($validator->fails())
      return $validator->errors();

    $this->create($request->all());
    return ("ok")
  }

}
