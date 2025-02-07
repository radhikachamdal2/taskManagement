"use client";
import React, { useEffect, useState } from "react";
import TaskTable from "../taskTable/taskTable";
import { useQuery } from "@tanstack/react-query";
import Dialog from "../../molecules/dialog/dialog";
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
  const [open, setOpen] = useState(false);

  const headers = ["", "Task", "Description", "Status"];

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

  interface FormField {
    title: string;
    description: [""];
    type: "text" | "textarea" | "select";
  }

  const formFields: FormField[] = [
    {
      title: "Task",
      description: [""],
      type: "text",
    },
    {
      title: "Description",
      description: [""],
      type: "textarea",
    },
    {
      title: "Status",
      description: ["In Progress", "Complete", "Not Started"],
      type: "select",
    },
  ];

  const handleCheckboxChange = (task: Task) => {
    setSelectedTask(task);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  console.log(open, "open");
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
        <Dialog
          actionText="Add New Tasks"
          title="Add New Task"
          openDialog={openDialog}
          open={open}
          handleClose={handleClose}
        >
          <DialogContentText style={{ display: "flex", textAlign: "center" }}>
            Enter in details to generate a new task, this will update
            automatically on your list!{" "}
          </DialogContentText>
          <Form
            taskLength={tasks?.length || 0}
            data={formFields}
            submitText="Add New Task"
            handleClose={handleClose}
          />
        </Dialog>
        <Dialog
          actionText="Update Exising Tasks"
          title="Update a task"
          openDialog={openDialog}
          open={open}
          handleClose={handleClose}
        >
          <DialogContentText style={{ display: "flex", textAlign: "center" }}>
            Fill the fields for the task which needs updating.
          </DialogContentText>
          <Form
            taskLength={tasks?.length || 0}
            data={formFields}
            taskToUpdate={selectedTask}
            submitText={"Update Task"}
            handleClose={handleClose}
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
