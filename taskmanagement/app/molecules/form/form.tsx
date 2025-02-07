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
  data: FormField[];
  taskLength: number;
  taskToUpdate?: {
    id: number;
    title: string;
    description: string;
    status: string;
  };
  submitText: string;
}

const Form: React.FC<FormProps> = ({
  data,
  taskLength,
  taskToUpdate,
  submitText,
}) => {
  const { formData, handleChange } = taskFunctions(taskToUpdate);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: taskToUpdate ? updateTasks : addTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    enabled: false,
  });

  const onSubmit = (data: { [key: string]: string }) => {
    const newTask = {
      id: taskToUpdate ? taskToUpdate.id : taskLength + 1,
      ...data,
    };

    mutation.mutate(newTask);
  };
  const formSubmit = async (data: { [key: string]: string }) => {
    const newTask = {
      id: taskLength + 1,
      ...data,
    };
    mutation.mutate(newTask);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.refetchQueries({ queryKey: ["tasks"] });
    }
  }, [mutation.isSuccess]);

  return (
    <form onSubmit={handleSubmit(taskToUpdate ? onSubmit : formSubmit)}>
      <div style={{ alignItems: "center", width: "100%" }}>
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
          <Button
            sx={{ backgroundColor: "black", textTransform: "none" }}
            variant={"contained"}
            type="submit"
            color="primary"
          >
            {submitText}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
