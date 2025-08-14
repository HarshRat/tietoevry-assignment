import type { AlertSeverity } from "../types";

export const SNACKBAR_ENUM: {
  [key: string]: AlertSeverity
} = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
} as const;
