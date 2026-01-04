<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('author');
            $table->string('publisher')->nullable();
            $table->year('year')->nullable();
            
            $table->string('file_source')->nullable(); 
            
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            
            $table->boolean('is_visible')->default(true);
            
            $table->string('category')->nullable();
            $table->json('tags')->nullable();
            $table->integer('sort_order')->default(0);
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};