import React, { useState } from "react";
import {
  Dialog as ReusableDialog,
  DialogTitle,
  Button,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  title: string;
  children: any;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  open,
  handleClose,
}) => {
  return (
    <>
      <ReusableDialog open={open} onClose={handleClose}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <IconButton
            onClick={handleClose}
            size="small"
            aria-label="Close Dialog"
          >
            <CloseIcon />
          </IconButton>
        </div>

        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children} </DialogContent>
      </ReusableDialog>
    </>
  );
};

export default Dialog;
