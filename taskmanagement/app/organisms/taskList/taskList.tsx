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
      title: "Tasks",
      description: "",
      type: "text",
    },
    {
      title: "Description",
      description: "",
      type: "textarea",
    },
    {
      title: "Status",
      description: ["In Progress", "Complete", "Not Started"],
      type: "select",
    },
  ];

  return (
    <>
      <Dialog title="Add a new Task">
        <DialogContentText style={{ display: "flex", textAlign: "center" }}>
          Enter in details to generate a new task, this will update
          automatically on your list!{" "}
        </DialogContentText>
        <Form taskLength={tasks?.length || []} data={formFields} />
      </Dialog>
      <TaskTable tasks={tasks || []} taskHeaders={headers} />;
    </>
  );
};

export default TaskList;
