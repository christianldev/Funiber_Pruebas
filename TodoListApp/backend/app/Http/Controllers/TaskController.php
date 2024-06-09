<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tasks\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //

    // obtener los tasks del usuario autenticado y ordenarlos por el campo order de menor a mayor y primero los que estén en estado pending
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks()->orderBy('status')->orderBy('order')->get();

        return response()->json($tasks);
    }

    public function store(TaskRequest $request)
    {
        $task = $request->user()->tasks()->create($request->validated());

        return response()->json($task);
    }

    public function show(Request $request, Task $task)
    {
        $this->authorize('view', $task);

        return response()->json($task);
    }

    public function update(TaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        $task->update($request->validated());

        return response()->json($task);
    }

    public function destroy(Request $request, Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return response()->json(null, 204);
    }

    public function reorder(Request $request)
    {
        $tasks = $request->user()->tasks()->get();

        foreach ($tasks as $task) {
            $task->update(['order' => array_search($task->id, $request->order)]);
        }

        return response()->json($tasks);
    }

    public function status(Request $request)
    {
        $tasks = $request->user()->tasks()->get();

        foreach ($tasks as $task) {
            $task->update(['status' => $request->status]);
        }

        return response()->json($tasks);
    }

    public function destroyCompleted(Request $request)
    {
        $request->user()->tasks()->byStatus('completed')->delete();

        return response()->json(null, 204);
    }

    public function destroyAll(Request $request)
    {
        $request->user()->tasks()->delete();

        return response()->json(null, 204);
    }

    public function reorderAll(Request $request)
    {
        $tasks = $request->user()->tasks()->get();

        foreach ($request->order as $order => $id) {
            $task = $tasks->find($id);
            $task->update(['order' => $order]);
        }

        return response()->json($tasks);
    }

    public function statusAll(Request $request)
    {
        $request->user()->tasks()->update(['status' => $request->status]);

        return response()->json(null, 204);
    }
}
