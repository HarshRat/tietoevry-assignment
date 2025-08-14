import { z } from 'zod';

// Employment form Zod schema
export const employmentFormSchema = z.object({
  employerName: z
    .string()
    .min(1, 'EMPLOYER_NAME_REQUIRED')
    .min(2, 'EMPLOYER_NAME_MIN_LENGTH')
    .max(100, 'EMPLOYER_NAME_MAX_LENGTH')
    .trim(),
  
  annualGrossIncome: z
    .string()
    .min(1, 'ANNUAL_INCOME_REQUIRED')
    .refine((val) => !isNaN(Number(val.replace(/[,$]/g, ''))), 'ANNUAL_INCOME_INVALID')
    .refine((val) => Number(val.replace(/[,$]/g, '')) > 0, 'ANNUAL_INCOME_POSITIVE')
    .refine((val) => Number(val.replace(/[,$]/g, '')) <= 10000000, 'ANNUAL_INCOME_MAX'),
  
  employmentStartDate: z
    .string()
    .min(1, 'START_DATE_REQUIRED')
    .refine((date) => {
      const selectedDate = new Date(date);
      return !isNaN(selectedDate.getTime());
    }, 'START_DATE_INVALID')
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    }, 'START_DATE_FUTURE'),
  
  employmentEndDate: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true; // Optional field
      const selectedDate = new Date(date);
      return !isNaN(selectedDate.getTime());
    }, 'END_DATE_INVALID'),
  
  notes: z
    .string()
    .max(1000, 'NOTES_MAX_LENGTH')
    .optional(),
}).refine((data) => {
  // If end date is provided, it must be after start date
  if (data.employmentEndDate && data.employmentStartDate) {
    const startDate = new Date(data.employmentStartDate);
    const endDate = new Date(data.employmentEndDate);
    return endDate >= startDate;
  }
  return true;
}, {
  message: 'END_DATE_BEFORE_START',
  path: ['employmentEndDate'],
});