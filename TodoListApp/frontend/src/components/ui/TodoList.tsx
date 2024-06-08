import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

function TodoList() {
  const [todos, setTodos] = useState<string[]>([
    "HTML",
    "CSS",
    "JS",
    "Bootstrap",
  ]);
  const [completed, setCompleted] = useState<boolean[]>(
    new Array(todos.length).fill(false)
  );

  const [input, setInput] = useState<string>("");

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const handleDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEdit = (index: number) => {
    const newText = prompt("Enter new task", todos[index]);
    if (newText !== null) {
      const newTodos = [...todos];
      newTodos[index] = newText.trim();
      setTodos(newTodos);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
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
                id="todo-input"
                placeholder="What do you need to do today?"
                required
                value={input}
                onChange={handleInputChange}
                style={{ borderRadius: "5px" }}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
            </div>
          </form>
          <ul id="todo-list">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="border-b border-gray-200 flex items-center justify-between py-4"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={completed[index]}
                    onChange={() => handleCheck(index)}
                  />
                  <span
                    className={
                      completed[index] ? "line-through text-blue-700" : ""
                    }
                  >
                    {todo}
                  </span>
                </label>
                <div>
                  <button
                    className="text-red-500 hover:text-red-700 mr-2 delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <FaRegTrashAlt />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 edit-btn"
                    onClick={() => handleEdit(index)}
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
