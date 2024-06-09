<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    public function delete(User $user, Task $task)
    {
        // Permitir la eliminación sólo si el usuario actual es el propietario de la tarea
        return $user->id === $task->user_id;
    }
}
