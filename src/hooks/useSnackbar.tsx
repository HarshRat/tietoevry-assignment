import React from "react";
import type { AlertSeverity } from "../types";
import { SNACKBAR_ENUM } from "../constants";
import { Snackbar } from "../components";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertSeverity;
}

interface UseSnackbarReturn {
  showSnackbar: (message: string, severity?: AlertSeverity) => void;
  SnackbarComponent: React.FC;
}

export const useSnackbar = (): UseSnackbarReturn => {
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false,
    message: "",
    severity: SNACKBAR_ENUM.INFO,
  });

  const showSnackbar = (message: string, severity: AlertSeverity = SNACKBAR_ENUM.INFO) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const SnackbarComponent: React.FC = () => (
    <Snackbar
      open={snackbar.open}
      message={snackbar.message}
      severity={snackbar.severity}
      onClose={handleClose}
    />
  );

  return { showSnackbar, SnackbarComponent };
};
