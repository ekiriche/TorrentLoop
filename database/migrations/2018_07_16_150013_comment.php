<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Comment extends Migration
{
  /**
	 * Run the migrations.
	 *
	 * @return void
	 */
    public function up()
    {
      Schema::create('comments', function (Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id');
        $table->integer('film_id');
        $table->string('content', 255);
        $table->integer('likes')->default(0);
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
        Schema::dropIfExists('comments');
    }
}
