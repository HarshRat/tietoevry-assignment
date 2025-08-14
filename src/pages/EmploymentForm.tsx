import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { Box, Typography, useTheme, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { RHFInput, Button } from "../components";
import { type EmploymentFormData } from "../types";
import { employmentFormSchema } from "../schemas";
import {
  calculateTotalIncome,
  formatCurrency,
  generateEmploymentDataFilename,
  downloadJsonFile,
  formatEmploymentDuration,
  transformZodError,
} from "../utils";
import { SUCCESS_MESSAGES, ERROR_MESSAGES, SNACKBAR_ENUM } from "../constants";
import { useSnackbar } from "../hooks/useSnackbar";

export const EmploymentForm: React.FC = () => {
  const theme = useTheme();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [totalIncome, setTotalIncome] = React.useState<number>(0);

  // Custom resolver that transforms error messages
  const customResolver = (values: EmploymentFormData) => {
    const result = employmentFormSchema.safeParse(values);
    
    if (!result.success) {
      const transformedError = transformZodError(result.error) as { issues: Array<{ path: string[]; code: string; message: string }> };
      return {
        values: {},
        errors: Object.fromEntries(
          transformedError.issues.map((issue) => [
            issue.path.join('.'),
            {
              type: issue.code,
              message: issue.message,
            },
          ])
        ),
      };
    }
    
    return { values: result.data, errors: {} };
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<EmploymentFormData>({
    resolver: customResolver,
    mode: "onChange",
    defaultValues: {
      employerName: "",
      annualGrossIncome: "",
      employmentStartDate: "",
      employmentEndDate: "",
      notes: "",
    },
  });

  const annualGrossIncome = useWatch({ control, name: "annualGrossIncome" });
  const employmentStartDate = useWatch({ control, name: "employmentStartDate" });
  const employmentEndDate = useWatch({ control, name: "employmentEndDate" });

  // Calculate total income based on date range
  React.useEffect(() => {
    const total = calculateTotalIncome(
      annualGrossIncome,
      employmentStartDate,
      employmentEndDate
    );
    setTotalIncome(total);
  }, [annualGrossIncome, employmentStartDate, employmentEndDate]);

  const onSubmit = async (data: EmploymentFormData) => {
    try {
      // Calculate employment duration for export
      const calculatedYears = formatEmploymentDuration(
        employmentStartDate,
        employmentEndDate
      );

      // Create export data
      const exportData = {
        ...data,
        totalIncome,
        employmentDuration: calculatedYears,
        exportDate: new Date().toISOString(),
      };

      // Generate filename and download
      const filename = generateEmploymentDataFilename(data.employerName);
      await downloadJsonFile(exportData, filename);

      // Show success message
      showSnackbar(SUCCESS_MESSAGES.FORM_SAVED, SNACKBAR_ENUM.SUCCESS);
    } catch (error) {
      // Show error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : ERROR_MESSAGES.FILE_DOWNLOAD_ERROR;
      showSnackbar(errorMessage, SNACKBAR_ENUM.ERROR);
    }
  };

  const handleCancel = () => {
    reset();
    setTotalIncome(0);
  };

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        p: { xs: theme.spacing(2), sm: theme.spacing(4) },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: theme.spacing(2), sm: theme.spacing(4) },
        }}
      >
        {/* Title */}
        <Typography variant="h5">Edit Life Event</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={{ xs: theme.spacing(2), sm: theme.spacing(3) }}
          >
            {/* First Row - Employer Name and Annual Income */}
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFInput
                name="employerName"
                control={control}
                label="Employer's Name *"
                placeholder="Test"
                inputType="text"
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <RHFInput
                name="annualGrossIncome"
                control={control}
                label="Annual Gross Income (Amount) *"
                placeholder="100,000"
                inputType="amount"
                fullWidth
              />
            </Grid>

            {/* Second Row - Start Date and End Date */}
            <Grid size={{ xs: 12, md: 6 }}>
              <RHFInput
                name="employmentStartDate"
                control={control}
                label="Employment Start Date *"
                inputType="calendar"
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <RHFInput
                name="employmentEndDate"
                control={control}
                label="Employment End Date"
                inputType="calendar"
                fullWidth
              />
            </Grid>

            {/* Third Row - Notes (Full Width) */}
            <Grid size={{ xs: 12 }}>
              <RHFInput
                name="notes"
                control={control}
                label="Notes"
                inputType="multiline"
                fullWidth
              />
            </Grid>

            {/* Total Income and Action Buttons in same row */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "stretch", sm: "center" },
                  mt: { xs: theme.spacing(1.5), sm: theme.spacing(2) },
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: theme.spacing(1.5), sm: theme.spacing(2) },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  Total Income: ${formatCurrency(totalIncome)}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: theme.spacing(1.5), sm: theme.spacing(2) },
                    justifyContent: { xs: "center", sm: "flex-end" },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={!isDirty}
                    sx={{
                      flex: { xs: 1, sm: "none" },
                      minWidth: { xs: "auto", sm: 100 },
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValid || !isDirty}
                    sx={{
                      flex: { xs: 1, sm: "none" },
                      minWidth: { xs: "auto", sm: 100 },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <SnackbarComponent />
    </Box>
  );
};

export default EmploymentForm;
