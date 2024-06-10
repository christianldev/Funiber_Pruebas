import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
} from "../../services/todolist.services";
import useAuthContext from "../../hooks/useAuthContext";
import Task from "../../interfaces/Task";
import toast from "react-hot-toast";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import EditModalTodo from "./EditModalTodo";
import TodoFilter from "./TodoFilter";

function TodoList() {
  const [todos, setTodos] = useState<Task[]>([]); // Changed this line
  const [selectedTodo, setSelectedTodo] = useState<Task>({
    id: 0,
    title: "",
    order: 0,
    status: "",
  }); // Changed this line
  const [completed, setCompleted] = useState<boolean[]>([]); // Changed this line
  const [openModal, setOpenModal] = useState(false);

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
        status: input.status,
      };

      const response = await createTask(newTask, user?.id);

      if (response) {
        // Actualiza la lista de tareas
        setTodos([...todos, response]);
        // Limpia el input
        setInput({ ...input, title: "" });
        // Muestra un mensaje de éxito
        toast.success("Tarea creada con éxito");
      } else {
        // Maneja el error
        toast.error("Error al crear la tarea");
      }
    } else {
      toast.error("El título no puede estar vacío");
    }
  };

  const handleDelete = async (taskId: number) => {
    const response = await deleteTask(taskId);
    console.log(response);
    setTodos(todos.filter((task) => task.id !== taskId));
  };

  // Esta función se llama cuando se envía el formulario de edición de la tarea.
  // Hace una solicitud para editar la tarea y luego actualiza el estado de las tareas.
  const handleEditTodo = async () => {
    if (selectedTodo) {
      const response = await editTask(selectedTodo);
      if (response?.status === 200) {
        // Actualiza la lista de tareas
        setTodos(
          todos.map((task) =>
            task.id === selectedTodo.id ? selectedTodo : task
          )
        );
        // Cierra el modal
        setOpenModal(false);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevInput) => ({ ...prevInput, title: event.target.value }));
  };

  // si activo el check, se tacha el texto con un estilo tailwind css

  const handleCheck = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  const handleOpenModal = (todo: Task) => {
    setOpenModal(true);
    setSelectedTodo(todo);
  };

  const handleTodoTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTodo({ ...selectedTodo, title: e.target.value });
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTodo({
      ...selectedTodo,
      status: e.target.value,
    });
  };

  return (
    <div className="container mx-auto my-10">
      <div className="md:w-1/2 mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <form id="todo-form" onSubmit={handleAddTodo}>
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-md font-semibold mb-4">Revisa tus tareas</h5>
              <TodoFilter />
            </div>
            <div className="flex mb-4">
              <input
                type="text"
                className="w-full px-4 py-2 mr-2 rounded-lg border-gray-500 focus:outline-none focus:border-blue-500"
                name="title"
                placeholder="Qué necesitas hacer?"
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
                    onClick={() => handleOpenModal(todo)}
                  >
                    <FaPen />
                  </button>
                </div>
              </li>
            ))}
            {openModal && selectedTodo && (
              <EditModalTodo
                todo={selectedTodo}
                onEdit={handleEditTodo}
                onClose={() => setOpenModal(false)}
                onTodoTitleChange={handleTodoTitleChange}
                handleStatusChange={handleStatusChange}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
