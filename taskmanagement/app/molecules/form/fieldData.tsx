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

interface FormFieldProps {
  field: {
    title: string;
    description: string[];
    type: "text" | "textarea" | "select";
  };
  control: any;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  control,
  handleChange,
}) => {
  const { title, description, type } = field;

  console.log(field, "fieldddd", field.title);
  return type === "text" || type === "textarea" ? (
    <Controller
      name={title.toLowerCase()}
      control={control}
      defaultValue=""
      render={({ field: controllerField }) => (
        <TextField
          {...controllerField}
          name={title.toLowerCase()}
          id={title}
          variant={"outlined"}
          label={title}
          sx={{ width: "80%", padding: "10px" }}
          onChange={(event) => {
            controllerField.onChange(event);
            handleChange(event, field);
          }}
        />
      )}
    />
  ) : type === "select" ? (
    <FormControl sx={{ width: "80%" }}>
      <Controller
        name={title}
        control={control}
        defaultValue=""
        render={({ field: controllerField }) => (
          <div style={{ padding: "10px" }}>
            <TextField
              select
              label={title}
              defaultValue=""
              helperText="Select a status"
              variant="standard"
              fullWidth
            >
              {description.map((item: string) => (
                <option>{item}</option>
              ))}
            </TextField>
          </div>
        )}
      />
    </FormControl>
  ) : null;
};

export default FormField;
