import { ERROR_MESSAGES } from '../constants';

/**
 * Resolves error message keys to actual error messages
 * @param errorKey - Error key from validation or constants
 * @returns Human-readable error message
 */
export const resolveErrorMessage = (errorKey: string): string => {
  // Check if the error key exists in our constants
  if (errorKey in ERROR_MESSAGES) {
    return ERROR_MESSAGES[errorKey as keyof typeof ERROR_MESSAGES];
  }
  
  // If not found, return the key itself (fallback)
  return errorKey;
};

/**
 * Transforms Zod error messages using our error constants
 * @param zodError - Zod validation error
 * @returns Transformed error with resolved messages
 */
export const transformZodError = (zodError: unknown): unknown => {
  if (zodError && typeof zodError === 'object' && 'issues' in zodError) {
    const errorWithIssues = zodError as { issues: Array<{ message: string; [key: string]: unknown }> };
    return {
      ...zodError,
      issues: errorWithIssues.issues.map((issue) => ({
        ...issue,
        message: resolveErrorMessage(issue.message),
      })),
    };
  }
  return zodError;
};