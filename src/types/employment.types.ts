import { z } from "zod";
import { employmentFormSchema } from "../schemas";

// Infer TypeScript type from Zod schema
export type EmploymentFormData = z.infer<typeof employmentFormSchema>;
