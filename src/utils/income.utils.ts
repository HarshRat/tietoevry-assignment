/**
 * Utility functions for income calculations
 */

import { countLeapDays } from './date.utils';

/**
 * Parses income string and removes formatting characters
 * @param incomeString - Income string with potential formatting (e.g., "$100,000")
 * @returns Numeric value of the income
 */
export const parseIncomeString = (incomeString: string): number => {
  return Number(incomeString.replace(/[,$]/g, ""));
};

/**
 * Calculates the number of years between two dates by removing leap days
 * @param startDate - Employment start date
 * @param endDate - Employment end date (optional, defaults to current date)
 * @returns Number of years (including fractional years)
 */
export const calculateEmploymentYears = (
  startDate: string,
  endDate?: string
): number => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  if (start > end) {
    return 0;
  }

  // Step 1: Get start date and end date
  // Step 2: Calculate total days between dates and add 1 day.
  const timeDiff = end.getTime() - start.getTime() + (1000 * 3600 * 24);
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
 * Calculates total income based on annual income and employment duration
 * @param annualIncomeString - Annual income as string (may contain formatting)
 * @param startDate - Employment start date
 * @param endDate - Employment end date (optional)
 * @returns Total income over the employment period
 */
export const calculateTotalIncome = (
  annualIncomeString: string,
  startDate: string,
  endDate?: string
): number => {
  if (!annualIncomeString || !startDate) {
    return 0;
  }

  const annualIncome = parseIncomeString(annualIncomeString);
  const years = calculateEmploymentYears(startDate, endDate);

  return annualIncome * years;
};

/**
 * Formats a number as currency string
 * @param amount - Numeric amount
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }
): string => {
  return amount.toLocaleString("en-US", options);
};
