import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./form.styles.css";

interface FormField {
  title: string;
  description: string[];
  type: "text" | "textarea" | "select";
}

interface FormProps {
  data: FormField[];
  taskLength: number | 0;
}

const Form: React.FC<FormProps> = ({ data, taskLength }) => {
  const [formData, setFormData] = useState({
    tasks: "",
    description: "",
    status: "",
  });

  console.log(formData, "formData", taskLength, "taskLength");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: FormField
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async (newTask: any) => {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        console.log("error in this ");
      }
      return response.json();
    },
    enabled: false,
  });

  const formSubmit = async (data: any) => {
    const newTask = {
      id: taskLength + 1,
      ...formData,
    };
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
        {data?.map((field, index) => (
          <div key={index}>
            {field.type === "text" || field.type === "textarea" ? (
              <Controller
                name={field.title.toLowerCase()}
                control={control}
                defaultValue=""
                render={({ field: controllerField }) => (
                  <TextField
                    {...controllerField}
                    name={field.title.toLowerCase()}
                    id={field.title}
                    variant={"outlined"}
                    label={field.title}
                    sx={{ width: "80%", padding: "10px" }}
                    onChange={(event) => {
                      controllerField.onChange(event);
                      handleChange(event, field);
                    }}
                  />
                )}
              />
            ) : field.type === "select" ? (
              <FormControl sx={{ width: "80%" }}>
                <Controller
                  name={field.title}
                  control={control}
                  defaultValue=""
                  render={({ field: controllerField }) => (
                    <div style={{ padding: "10px" }}>
                      <TextField
                        // id="standard-select-currency-native"
                        select
                        label={field.title}
                        defaultValue=""
                        helperText="Select a status"
                        variant="standard"
                        fullWidth
                      >
                        {field.description.map((item: string) => (
                          <option>{item}</option>
                        ))}
                      </TextField>
                    </div>
                  )}
                />
              </FormControl>
            ) : null}
          </div>
        ))}
        <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <Button variant={"contained"} type="submit">
            Add Task!
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
