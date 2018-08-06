<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateFilmTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('films', function (Blueprint $table) {
          $table->dropColumn('imdb_id');
          $table->string('path');
          $table->unsignedBigInteger('delete_time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('films', function (Blueprint $table) {
          $table->dropColumn('path');
		  $table->dropColumn('delete_time');
        });
    }
}
