import { Controller } from "react-hook-form";
import type { FieldValues, FieldPath } from "react-hook-form";
import type { RHFInputProps } from "../../types/input.types";
import { formatAmount } from "../../utils/amount.utils";
import { BaseInput } from "./BaseInput";

// React Hook Form supported input
export const RHFInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  rules,
  inputType,
  ...inputProps
}: RHFInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        // For amount inputs, format the initial value
        const fieldValue =
          inputType === "amount" && field.value
            ? formatAmount(field.value.toString())
            : field.value;

        return (
          <BaseInput
            {...inputProps}
            {...field}
            inputType={inputType}
            value={fieldValue}
            error={!!error}
            helperText={error?.message || inputProps.helperText}
          />
        );
      }}
    />
  );
};