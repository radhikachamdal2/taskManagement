"use client";
import React, { useEffect, useState } from "react";
import TaskTable from "../taskTable/taskTable";
import { useQuery } from "@tanstack/react-query";
import Dialog from "../dialog/dialog";
import Form from "@/app/molecules/form/form";
import { DialogContentText } from "@mui/material";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const getAllTasks = async (): Promise<Task[]> => {
  const response = await fetch("/api/tasks");
  if (!response) {
    throw new Error("Unfortunately can not fetch tasks");
  } else {
    return response.json();
  }
};

const TaskList = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const headers = ["ID", "Task", "Description", "Status"];

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  if (isLoading) {
    return <p>Loading.... </p>;
  } else if (isError) {
    return <p>Errors present... </p>;
  }

  const formFields: FormField[] = [
    {
      title: "title",
      description: "",
      type: "text",
    },
    {
      title: "description",
      description: "",
      type: "textarea",
    },
    {
      title: "status",
      description: ["In Progress", "Complete", "Not Started"],
      type: "select",
    },
  ];

  const handleCheckboxChange = (task: Task) => {
    setSelectedTask(task); // Set the selected task to be passed into the form
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: "30px",
        }}
      >
        <Dialog actionText="Add New Tasks" title="Add a new Task">
          <DialogContentText style={{ display: "flex", textAlign: "center" }}>
            Enter in details to generate a new task, this will update
            automatically on your list!{" "}
          </DialogContentText>
          <Form taskLength={tasks?.length || 0} data={formFields} />
        </Dialog>
        <Dialog actionText="Update Exising Tasks" title="Update a task">
          <DialogContentText style={{ display: "flex", textAlign: "center" }}>
            Update the task accordingly
          </DialogContentText>
          <Form
            taskLength={tasks?.length || 0}
            data={formFields}
            taskToUpdate={selectedTask}
          />
        </Dialog>
      </div>
      <TaskTable
        tasks={tasks || []}
        taskHeaders={headers}
        onCheckboxChange={handleCheckboxChange}
      />
      ;
    </>
  );
};

export default TaskList;
