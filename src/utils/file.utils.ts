/**
 * Utility functions for file operations
 */

/**
 * Generates a filename for employment data export
 * @param employerName - Name of the employer
 * @param date - Date for the filename (optional, defaults to current date)
 * @returns Formatted filename
 */
export const generateEmploymentDataFilename = (
  employerName: string,
  date?: Date
): string => {
  const exportDate = date || new Date();
  const sanitizedEmployerName = employerName
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, ""); // Remove special characters
  
  const dateString = exportDate.toISOString().split("T")[0];
  
  return `employment-data-${sanitizedEmployerName}-${dateString}.json`;
};

/**
 * Creates and downloads a JSON file with the provided data
 * @param data - Data to be saved in the file
 * @param filename - Name of the file to download
 * @returns Promise that resolves on success or rejects with error
 */
export const downloadJsonFile = async (
  data: Record<string, unknown>,
  filename: string
): Promise<void> => {
  try {
    // Try to stringify the data with error handling
    let jsonString: string;
    try {
      jsonString = JSON.stringify(data, null, 2);
    } catch (stringifyError) {
      throw new Error(`Failed to serialize data: ${stringifyError instanceof Error ? stringifyError.message : 'Unknown error'}`);
    }

    // Create blob and download
    const blob = new Blob([jsonString], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    // Temporarily add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  } catch (error) {
    // Re-throw with more context
    throw new Error(`File download failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

