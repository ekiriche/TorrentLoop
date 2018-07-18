<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWatchColumnToMovieHistories extends Migration
{
	/**
	* Run the migrations.
	*
	* @return void
	*/
	public function up()
	{
		Schema::table('movie_histories', function (Blueprint $table) {
			$table->string('watch');
		});
	}

	/**
	* Reverse the migrations.
	*
	* @return void
	*/
	public function down()
	{
		Schema::table('movie_histories', function (Blueprint $table) {
			$table->dropColumn('watch');
		});
	}
}
