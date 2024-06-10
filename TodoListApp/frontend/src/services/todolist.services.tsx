import toast from "react-hot-toast";
import axios from "../lib/axios";
import Task from "../types/Task";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`/api/tasks`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    toast.error(getErrorMessage(err));
    return [];
  }
};

export const reorderTasks = async (
  userId: number,
  start: number,
  end: number
): Promise<void> => {
  try {
    const response = await axios.put("/tasks", {
      project_id: userId,
      start,
      end,
    });
    const { success, message } = response.data;

    toast[success ? "success" : "error"](message);
  } catch (err) {
    toast.error(getErrorMessage(err));
  }
};

export const deleteTask = async (id: number) => {
  if (!id) {
    toast.error("Invalid task!");
    return;
  }

  try {
    const response = await axios.delete(`/api/tasks/${id}`);

    toast.success("Tarea eliminada con éxito");
  } catch (err) {
    toast.error(getErrorMessage(err));
  }
};

export const editTask = async (task: Task) => {
  if (!task.id) return;
  if (!task.title) {
    toast.error("Titulo es requerido!");
    return;
  }

  try {
    const response = await axios.put(`/api/tasks/${task.id}`, {
      title: task.title,
      order: task.order,
      status: task.status,
    });

    toast.success("Tarea actualizada con éxito");

    return response;
  } catch (err) {
    toast.error(getErrorMessage(err));
  }
};

export const createTask = async (task: Task, userId: number | undefined) => {
  if (!task.title) {
    toast.error("Title es requerido!");
    return null;
  }

  try {
    const response = await axios.post(`/api/tasks`, {
      userId,
      title: task.title,
      order: task.order,
      status: task.status,
    });

    // Devuelve la respuesta
    return response.data;
  } catch (err) {
    toast.error(getErrorMessage(err));
    // Devuelve null en caso de error
    return null;
  }
};
