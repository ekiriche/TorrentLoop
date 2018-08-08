<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function (Blueprint $table) {
			$table->increments('id');
			$table->string('login', 64)->unique();
			$table->string('firstname', 32);
			$table->string('lastname', 32);
			$table->string('email', 64)->unique();
			$table->string('password')->nullable();
			$table->string('photo')->nullable();
			$table->string('info', 500)->nullable();
			$table->string('lang')->default("en");
			$table->boolean('access_level')->default(0);
			$table->string('reg_link')->nullable();
			$table->string('access_token')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('users');
	}
}
