/**
 * Formats a numeric string with US-style comma separators and dollar prefix
 * @param value - The numeric string to format
 * @returns Formatted string with commas (e.g., "100,000")
 */
export const formatAmount = (value: string): string => {
  // Remove all non-digit characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, "");

  // Handle empty or invalid input
  if (!numericValue || numericValue === ".") {
    return "";
  }

  // Handle decimal point
  const parts = numericValue.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1];

  // Remove leading zeros but keep at least one digit
  integerPart = integerPart.replace(/^0+/, "") || "0";

  // Add commas for thousands (US format: 100,000 not 1,00,000)
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine integer and decimal parts
  let formatted = integerPart;
  if (decimalPart !== undefined) {
    formatted += "." + decimalPart.slice(0, 2); // Limit to 2 decimal places
  }

  return formatted;
};

/**
 * Parses a formatted amount string to extract numeric value
 * @param value - The formatted string (may contain $ and commas)
 * @returns Clean numeric string
 */
export const parseAmount = (value: string): string => {
  // Remove dollar sign and commas, keep only digits and decimal point
  return value.replace(/[$,]/g, "");
};