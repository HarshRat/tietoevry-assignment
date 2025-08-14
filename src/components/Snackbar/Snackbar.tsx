import React from "react";
import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import type { AlertSeverity } from "../../types";
import { SNACKBAR_ENUM } from "../../constants";

export interface SnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertSeverity;
  autoHideDuration?: number;
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity = SNACKBAR_ENUM.INFO,
  autoHideDuration = 6000,
  onClose,
}) => {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};