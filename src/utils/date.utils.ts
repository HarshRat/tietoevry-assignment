/**
 * Utility functions for date operations
 */

/**
 * Counts the number of February 29th dates that occur between two dates
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of February 29th dates in the range
 */
export const countLeapDays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  
  for (let year = startYear; year <= endYear; year++) {
    // Check if this year has a leap day (Feb 29)
    const feb29 = new Date(year, 1, 29); // Month is 0-indexed, so 1 = February
    
    // Only count if Feb 29 exists (valid date) and falls within our range
    if (feb29.getMonth() === 1 && feb29.getDate() === 29) {
      if (feb29 >= startDate && feb29 <= endDate) {
        count++;
      }
    }
  }
  
  return count;
};

/**
 * Calculates the precise difference between two dates in years by removing leap days
 * @param startDate - Start date string
 * @param endDate - End date string (optional, defaults to current date)
 * @returns Number of years with decimal precision
 */
export const calculateYearsDifference = (
  startDate: string,
  endDate?: string
): number => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  if (start > end) {
    return 0;
  }
  
  // Step 1: Get start date and end date
  // Step 2: Calculate total days between dates
  const timeDiff = end.getTime() - start.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  // Step 3: Calculate number of 29th Febs that would occur between those dates
  const leapDays = countLeapDays(start, end);
  
  // Step 4: Delete those number of days
  const adjustedDays = totalDays - leapDays;
  
  // Calculate years based on 365 days per year
  const years = adjustedDays / 365;
  
  return Math.max(years, 0);
};

/**
 * Formats years difference for display
 * @param startDate - Start date string
 * @param endDate - End date string (optional)
 * @param precision - Number of decimal places (default: 2)
 * @returns Formatted years string or "Current" if no end date
 */
export const formatEmploymentDuration = (
  startDate: string,
  endDate?: string,
  precision: number = 2
): string => {
  if (!endDate) {
    return "Current";
  }
  
  const years = calculateYearsDifference(startDate, endDate);
  return years.toFixed(precision);
};

/**
 * Validates if a date string is valid
 * @param dateString - Date string to validate
 * @returns True if valid date, false otherwise
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Checks if a date is in the future
 * @param dateString - Date string to check
 * @returns True if date is in the future, false otherwise
 */
export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  
  return date > today;
};

/**
 * Checks if end date is after start date
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns True if end date is after start date, false otherwise
 */
export const isEndDateAfterStartDate = (
  startDate: string,
  endDate: string
): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return end >= start;
};