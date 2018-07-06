<?php

Route::get('/', function () {
    return view('welcome');
});

Route::post('signin', 'Auth\LoginController@attemptLogin');
Route::post('signup', 'Auth\RegisterController@attemptRegister');
Route::post('osignup', 'Auth\RegisterController@oauthRegister');
Route::post('update-pass', 'Auth\ResetPasswordController@update');
Route::post('reset-pass', 'Auth\ResetPasswordController@reset');
Route::get('confirm', 'Auth\RegisterController@ConfirmViaEmail');
