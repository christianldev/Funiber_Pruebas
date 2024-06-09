<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Cada tarea debe tener los siguientes atributos:
     * id (autogenerate)
     * title
     * order
     * status (pending, in progress or completed).
     * created_at
     * updated_at

     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('order');
            $table->enum('status', ['pending', 'in progress', 'completed']);
            $table->softDeletes(); // Agregar columna `deleted_at`
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
