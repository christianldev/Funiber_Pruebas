import {
  createTask,
  deleteTask,
  getTasks,
} from "../../services/todolist.services";
import useAuthContext from "../../hooks/useAuthContext";
import Task from "../../interfaces/Task";
import { toast } from "react-toastify";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";

function TodoList() {
  const [todos, setTodos] = useState<Task[]>([]); // Changed this line
  const [completed, setCompleted] = useState<boolean[]>([]); // Changed this line

  const [input, setInput] = useState({
    id: 0,
    title: "",
    order: 0,
    status: "pending",
  } as Task);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTodos(data);
      setCompleted(new Array(data.length).fill(false)); // Added this line
    };

    fetchTasks();
  }, [todos.length]);

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (input.title.trim() !== "") {
      const newTask: Task = {
        id: 0, // Assume 'id' is 0
        title: input.title.trim(),
        order: todos.length, // Assume 'order' is the current length of 'todos'
        status: "pending",
      };

      const response = await createTask(newTask, user?.id);

      if (response) {
        // Actualiza la lista de tareas
        setTodos([...todos, response]);
        // Limpia el input
        setInput({ ...input, title: "" });
        // Muestra un mensaje de éxito
        toast.success("Task created successfully");
      } else {
        // Maneja el error
        toast.error("Error creating task");
      }
    } else {
      toast.error("Task title cannot be empty");
    }
  };

  const handleDelete = async (taskId: number) => {
    console.log("Deleting task with id: ", taskId);
    const response = await deleteTask(taskId);
    console.log(response);
    setTodos(todos.filter((task) => task.id !== taskId));
  };

  const handleEdit = (index: number) => {
    const newTodos = [...todos];
    const newTask = { ...newTodos[index] };
    newTask.title = prompt("Edit task", newTask.title) || newTask.title;
    newTodos[index] = newTask;
    setTodos(newTodos);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  // si activo el check, se tacha el texto con un estilo tailwind css

  const handleCheck = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  return (
    <div className="container mx-auto my-10">
      <div className="md:w-1/2 mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <form id="todo-form" onSubmit={handleAddTodo}>
            <h5 className="text-sm font-semibold mb-4">Awesome Todo List</h5>
            <div className="flex mb-4">
              <input
                type="text"
                className="w-full px-4 py-2 mr-2 rounded-lg border-gray-500 focus:outline-none focus:border-blue-500"
                name="title"
                placeholder="What do you need to do today?"
                value={input.title}
                onChange={(e) =>
                  handleInputChange(e as ChangeEvent<HTMLInputElement>)
                }
                style={{ borderRadius: "5px" }}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
            </div>
          </form>
          <ul id="todo-list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="border-b border-gray-200 flex items-center justify-between py-4"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={completed[todo.id]}
                    onChange={() => handleCheck(todo.id)}
                  />
                  <span
                    className={
                      completed[todo.id] ? "line-through text-blue-700" : ""
                    }
                  >
                    {todo.title}
                  </span>
                </label>
                <div>
                  <button
                    className="text-red-500 hover:text-red-700 mr-2 delete-btn"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 edit-btn"
                    onClick={() => handleEdit(todo.id)}
                  >
                    <FaPen />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
