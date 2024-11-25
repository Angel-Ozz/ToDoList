import axios from "axios";
import { Task } from "../types/Task";

const API_BASE_URL = "http://localhost:9090/todos";

// Fetch all tasks with optional filtering, sorting, and pagination
export const fetchTasks = async (
  page: number,
  size: number = 10,
  sortBy?: string,
  filterBy?: string,
  priority?: string,
  completed?: boolean,
  taskName?: string
): Promise<Task[]> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(sortBy && { sortBy }),
    ...(filterBy && { filterBy }),
    ...(priority && { priority }),
    ...(completed !== undefined && { completed: completed.toString() }),
    ...(taskName && { taskName }),
  });

  const response = await axios.get(`${API_BASE_URL}?${params.toString()}`);
  return response.data;
};

// Fetch a single task by ID
export const fetchTaskById = async (id: number): Promise<Task> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (task: Partial<Task>): Promise<void> => {
  await axios.post(API_BASE_URL, task);
};

// Mark a task as done
export const markTaskAsDone = async (id: number): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/${id}/done`);
};

// Mark a task as undone
export const markTaskAsUnDone = async (id: number): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/${id}/undone`);
};

// Partially update a task
export const updateTask = async (
  id: number,
  updates: Partial<Task>
): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/${id}`, updates);
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
