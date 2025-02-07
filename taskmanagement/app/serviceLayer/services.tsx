import { tasks } from "../api/mockData";
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export const getTasks = async () => {
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    throw new Error("Error fetching tasks");
  }
  return response.json();
};

export const addTasks = async (newTask: any) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  if (!response.ok) {
    throw new Error("Error adding a new task");
  }
  return response.json();
};

export const updateTasks = async (
  id,
  updatedField: Partial<Task>
): Promise<Task> => {
  const response = await fetch(`/api/tasks/${id.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    throw new Error("Error adding a new task");
  }

  const updatedValue: Task = await response.json();

  updatedValue.forEach((newTask: Task) => {
    const taskIndex = tasks.findIndex((task) => task.id === newTask.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = newTask;
    }
  });

  return updatedValue;
};
