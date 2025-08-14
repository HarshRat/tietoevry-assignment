import type { TextFieldProps } from "@mui/material";
import type { Control, FieldPath, FieldValues, Controller } from "react-hook-form";

// Custom input types
export type InputType =
  | "text"
  | "multiline"
  | "calendar"
  | "amount";

// Base Input Props
export interface BaseInputProps extends Omit<TextFieldProps, "type"> {
  inputType?: InputType;
}

// React Hook Form Integration Props
export interface RHFInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseInputProps {
  name: TName;
  control: Control<TFieldValues>;
  rules?: Parameters<typeof Controller<TFieldValues, TName>>[0]["rules"];
}