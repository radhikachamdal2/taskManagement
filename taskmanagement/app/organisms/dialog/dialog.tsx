import React, { useState } from "react";
import {
  Dialog as ReusableDialog,
  DialogTitle,
  Button,
  DialogContent,
} from "@mui/material";

interface DialogProps {
  title: string;
  children: any;
}

const Dialog: React.FC<DialogProps> = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <Button onClick={openDialog}> Add a new task </Button>
      <ReusableDialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children} </DialogContent>
      </ReusableDialog>
    </>
  );
};

export default Dialog;
