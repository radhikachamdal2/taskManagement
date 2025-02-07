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
    status?: string;
    type: "text" | "textarea" | "select";
  };
  control: any;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: {
      title: string;
      description: string[];
      status?: string;
      type: "text" | "textarea" | "select";
    }
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  control,
  handleChange,
}) => {
  const { title, description, status, type } = field;
  return type === "text" || type === "textarea" ? (
    <Controller
      name={title.toLowerCase()}
      control={control}
      defaultValue=""
      rules={{
        required: true,
      }}
      render={({ field: controllerField }) => (
        <TextField
          {...controllerField}
          name={title.toLowerCase()}
          id={title}
          variant={"outlined"}
          label={title}
          required
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
        name={title.toLowerCase()}
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field: controllerField }) => (
          <div style={{ padding: "10px" }}>
            <TextField
              {...controllerField}
              select
              name="status"
              label={title}
              defaultValue=""
              helperText="Select a status"
              variant="standard"
              fullWidth
              required
              onChange={(event) => {
                controllerField.onChange(event);
                handleChange(event, field);
              }}
            >
              {description.map((item: string, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </div>
        )}
      />
    </FormControl>
  ) : null;
};

export default FormField;
