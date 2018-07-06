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
Route::post('profile/save-history', 'UserProfile\MovieHistoryController@saveMovieToHistory');
Route::post('profile/get-history', 'UserProfile\MovieHistoryController@getHistory');
Route::post('profile/get-user-info', 'UserProfile\ProfileController@getUserInfo');
Route::post('profile/set-picture', 'UserProfile\ProfileController@setPicture');
Route::get('auth/confirm', 'Auth\RegisterController@ConfirmViaEmail');
