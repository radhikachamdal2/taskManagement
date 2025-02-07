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

  console.log(response.json());
  return response.json();
};

export const updateTasks = async (
  id: number,
  updatedField: Partial<Task>
): Promise<Task> => {
  console.log(id, "idddd");
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedField),
  });

  if (!response.ok) {
    throw new Error("Error adding a new task");
    debugger;
  }

  const updatedValue = await response.json();
  return updatedValue;
};
