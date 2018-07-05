<?php

Route::get('/', function () {
    return view('welcome');
});

Route::post('signin', 'Auth\LoginController@attemptLogin');
Route::post('signup', 'Auth\RegisterController@attemptRegister');
Route::post('update-pass', 'Auth\ResetPasswordController@update');
Route::post('reset-pass', 'Auth\ResetPasswordController@reset');
