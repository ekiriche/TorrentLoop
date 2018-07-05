<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('signin', 'Auth\LoginController@attemptLogin');
Route::post('signup', 'Auth\RegisterController@attemptRegister');
Route::get('confirm', 'Auth\RegisterController@ConfirmViaEmail');
