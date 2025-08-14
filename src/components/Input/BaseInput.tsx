import React from "react";
import { TextField } from "@mui/material";
import type { BaseInputProps } from "../../types/input.types";
import { formatAmount, parseAmount } from "../../utils/amount.utils";
import { useInputHelpers } from "./InputHelpers";

export const BaseInput: React.FC<BaseInputProps> = ({
  inputType = "text",
  value,
  onChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState(value || "");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Sync internal state with prop value
  React.useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  // Handle calendar icon click
  const handleCalendarClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
    }
  };

  const { getFieldType, getInputProps } = useInputHelpers({
    inputType,
    onCalendarClick: handleCalendarClick,
  });

  // Handle amount formatting
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const numericValue = parseAmount(rawValue);
    const formattedValue = formatAmount(numericValue);

    setInternalValue(formattedValue);

    // Call original onChange with numeric value
    if (onChange) {
      const syntheticEvent = {
        ...event,
        target: {
          ...event.target,
          value: numericValue,
        },
      };
      onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Handle regular input change
  const handleRegularChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const getDisplayValue = () => {
    if (inputType === "amount" && internalValue) {
      return formatAmount(internalValue.toString());
    }
    return internalValue;
  };

  const inputProps = getInputProps({
    ...props.InputProps,
  });

  // For calendar inputs, we need to ensure the label floats properly
  const getInputLabelProps = () => {
    if (inputType === "calendar") {
      return {
        shrink: true, // Force label to shrink/float above the input
        ...props.InputLabelProps,
      };
    }
    return props.InputLabelProps;
  };

  // For calendar inputs, remove placeholder to prevent overlap
  const getPlaceholder = () => {
    if (inputType === "calendar") {
      return undefined; // Remove placeholder for calendar inputs
    }
    return props.placeholder;
  };

  return (
    <TextField
      {...props}
      inputRef={inputRef}
      type={getFieldType()}
      multiline={inputType === "multiline"}
      rows={inputType === "multiline" ? props.rows || 4 : undefined}
      value={getDisplayValue()}
      placeholder={getPlaceholder()}
      onChange={
        inputType === "amount" ? handleAmountChange : handleRegularChange
      }
      InputProps={inputProps}
      InputLabelProps={getInputLabelProps()}
    />
  );
};
