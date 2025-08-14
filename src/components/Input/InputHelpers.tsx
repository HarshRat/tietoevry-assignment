import { InputAdornment, IconButton } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import type { OutlinedInputProps } from "@mui/material";
import type { InputType } from "../../types/input.types";

interface InputHelpersProps {
  inputType: InputType;
  onCalendarClick?: () => void;
}

export const useInputHelpers = ({
  inputType,
  onCalendarClick,
}: InputHelpersProps) => {
  const getFieldType = () => {
    switch (inputType) {
      case "calendar":
        return "date";
      case "amount":
        return "text";
      case "multiline":
        return "text";
      default:
        return inputType;
    }
  };

  const getEndAdornment = () => {
    if (inputType === "calendar") {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="open calendar"
            onClick={onCalendarClick}
            edge="end"
          >
            <CalendarToday />
          </IconButton>
        </InputAdornment>
      );
    }
    return undefined;
  };

  const getInputProps = (baseProps: OutlinedInputProps) => {
    switch (inputType) {
      case "amount":
        return {
          ...baseProps,
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        };
      case "calendar":
        return {
          ...baseProps,
          endAdornment: getEndAdornment(),
        };
      default:
        return baseProps;
    }
  };

  return {
    getFieldType,
    getInputProps,
  };
};