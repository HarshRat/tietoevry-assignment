/**
 * Error message constants for form validation and user feedback
 */

export const ERROR_MESSAGES = {
  // Employer Name Errors
  EMPLOYER_NAME_REQUIRED: "Employer name is required",
  EMPLOYER_NAME_MIN_LENGTH: "Employer name must be at least 2 characters",
  EMPLOYER_NAME_MAX_LENGTH: "Employer name must be less than 100 characters",
  EMPLOYER_NAME_CHARACTERS_ONLY:
    "Employer name can only contain letters and spaces",

  // Annual Income Errors
  ANNUAL_INCOME_REQUIRED: "Annual gross income is required",
  ANNUAL_INCOME_INVALID: "Must be a valid number",
  ANNUAL_INCOME_POSITIVE: "Income must be greater than 0",
  ANNUAL_INCOME_MAX: "Income must be realistic",

  // Start Date Errors
  START_DATE_REQUIRED: "Employment start date is required",
  START_DATE_INVALID: "Please enter a valid date",
  START_DATE_FUTURE: "Start date cannot be in the future",

  // End Date Errors
  END_DATE_INVALID: "Please enter a valid end date",
  END_DATE_BEFORE_START: "End date must be after start date",

  // Notes Errors
  NOTES_MAX_LENGTH: "Notes must be less than 1000 characters",

  // File Operation Errors
  FILE_GENERATION_ERROR: "Failed to generate file. Please try again.",
  FILE_DOWNLOAD_ERROR:
    "Failed to download file. Please check your browser settings.",

  // General Errors
  FORM_VALIDATION_ERROR: "Please fix the validation errors before submitting",
  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again.",
} as const;

export const SUCCESS_MESSAGES = {
  FORM_SAVED: "Form saved successfully! File has been downloaded.",
  FILE_DOWNLOADED: "Employment data file downloaded successfully.",
} as const;
