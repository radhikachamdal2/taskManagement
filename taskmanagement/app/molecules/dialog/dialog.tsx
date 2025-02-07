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
  actionText: string;
}

const Dialog: React.FC<DialogProps> = ({ title, children, actionText }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        sx={{ backgroundColor: "black", textTransform: "none" }}
        variant="contained"
        onClick={openDialog}
      >
        {actionText}
      </Button>
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
