import React, { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export const taskFunctions = (taskToUpdate: Task) => {
  const [formData, setFormData] = useState({
    title: taskToUpdate?.title || "",
    description: taskToUpdate?.description || "",
    status: taskToUpdate?.status || "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: {}
  ) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    formData,
    handleChange,
  };
};
