<?php

Route::get('/', function () {
    return view('welcome');
});

Route::post('auth/signin', 'Auth\LoginController@attemptLogin');
Route::post('auth/signup', 'Auth\RegisterController@attemptRegister');
Route::post('auth/osignup', 'Auth\RegisterController@oauthRegister');
Route::post('auth/update-pass', 'Auth\ResetPasswordController@update');
Route::post('auth/update-pass-oauth', 'Auth\ResetPasswordController@updateOAuth');
Route::post('auth/reset-pass', 'Auth\ResetPasswordController@reset');
Route::get('auth/confirm', 'Auth\RegisterController@ConfirmViaEmail');

Route::post('auth/token-exists', 'Auth\LoginController@checkAccessToken');
Route::post('auth/token-update', 'Auth\LoginController@updateAccessToken');

Route::post('profile/save-history', 'UserProfile\MovieHistoryController@saveMovieToHistory');
Route::post('profile/get-history', 'UserProfile\MovieHistoryController@getHistory');
Route::post('profile/get-user-info', 'UserProfile\ProfileController@getUserInfo');
Route::post('profile/set-picture', 'UserProfile\ProfileController@setPicture');
Route::post('profile/set-info', 'UserProfile\ProfileController@setInfo');
Route::post('profile/set-password', 'UserProfile\ProfileController@setPassword');

Route::post('movie/download-subtitles', 'Movies\SubtitleController@downloadSubtitles');
Route::post('movie/download-movie', 'Movies\TorrentController@downloadMovie');
Route::post('movie/get-download-percentage', 'Movies\TorrentController@getDownloadPercentage');
Route::post('movie/add-comment', 'CommentsLikes\CommentsController@addComment');
Route::post('movie/get-comment', 'CommentsLikes\CommentsController@getComments');
Route::post('movie/add-like', 'CommentsLikes\LikesController@addLike');
Route::post('movie/remove-like', 'CommentsLikes\LikesController@removeLike');
Route::post('movie/add-film-to-db', 'Movies\MoviesDeletionController@addFilmToDB');
Route::get('movie/delete-not-watched-films', 'Movies\MoviesDeletionController@deleteNotWatchedFilms');
