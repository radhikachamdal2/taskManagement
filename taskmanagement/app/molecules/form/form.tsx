import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { addTasks, getTasks, updateTasks } from "@/app/serviceLayer/services";
import { useForm, Controller } from "react-hook-form";
import { taskFunctions } from "./formState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./form.styles.css";
import FormField from "./fieldData";

interface FormField {
  title: string;
  description: string[];
  type: "text" | "textarea" | "select";
}

interface FormProps {
  data: any[];
  taskLength: number | 0;
  taskToUpdate?: {
    id: number;
    title: string;
    description: string;
    status: string;
  };
}

const Form: React.FC<FormProps> = ({ data, taskLength, taskToUpdate }) => {
  const { formData, handleChange } = taskFunctions(taskToUpdate);
  console.log(formData, "insidd form");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  //   const mutation = useMutation({
  //     mutationFn: updateTasks,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["tasks"] });
  //     },
  //   });

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    enabled: false,
  });

  const formSubmit = async (data: any) => {
    const newTask = {
      id: taskLength + 1,
      ...data,
    };
    console.log(newTask, data, "new tasks this one");
    mutation.mutate(newTask);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.refetchQueries({ queryKey: ["tasks"] });
    }
  }, [mutation.isSuccess]);

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div style={{ alignItems: "center", width: "100%", padding: "12px" }}>
        {data.map((field, index) => (
          <FormField
            key={index}
            field={field}
            control={control}
            handleChange={handleChange}
          />
        ))}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            gap: "20px",
          }}
        >
          {/* <Button variant="contained">Cancel</Button> */}
          <Button variant={"contained"} type="submit" color="primary">
            Add Task!
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
