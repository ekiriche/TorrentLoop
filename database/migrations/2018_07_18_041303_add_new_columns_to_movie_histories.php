<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewColumnsToMovieHistories extends Migration
{
	/**
	* Run the migrations.
	*
	* @return void
	*/
	public function up()
	{
		Schema::table('movie_histories', function (Blueprint $table) {
			$table->string('medium_cover_image');
			$table->string('title_english');
			$table->string('year');
			$table->string('rating');
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
			$table->dropColumn('medium_cover_image');
			$table->dropColumn('title_english');
			$table->dropColumn('year');
			$table->dropColumn('rating');
		});
	}
}
