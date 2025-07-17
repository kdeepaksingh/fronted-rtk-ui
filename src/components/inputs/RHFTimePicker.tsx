import { Controller } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import type { ReactNode } from "react";

interface RHFTimePickerProps {
  name: string;
  label: string;
  control: any;
  required?: boolean;
  rules?: any;
  disabled?: boolean;
  icon?: ReactNode;
  validateIf?: boolean;
  compareTime?: {
    compareWith: string;
    type: "greaterThan" | "lessThan";
    errorMessage: string;
  };
}

const RHFTimePicker = ({
  name,
  label,
  control,
  required = false,
  rules = {},
  disabled = false,
  icon,
  validateIf = true,
  compareTime,
}: RHFTimePickerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: Date | null, formValues: any) => {
          if (!validateIf) return true;

          if (required && !value) return `${label} is required`;
          if (value && isNaN(value.getTime())) return `Invalid ${label}`;

          if (compareTime) {
            const compareValue = formValues[compareTime.compareWith];
            if (value && compareValue) {
              const currentTime = value.getTime();
              const targetTime = new Date(compareValue).getTime();

              if (
                compareTime.type === "greaterThan" &&
                currentTime <= targetTime
              ) {
                return compareTime.errorMessage;
              }

              if (
                compareTime.type === "lessThan" &&
                currentTime >= targetTime
              ) {
                return compareTime.errorMessage;
              }
            }
          }

          return true;
        },
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TimePicker
          label={label}
          value={value || null}
          onChange={(val) => onChange(val)}
          disabled={disabled}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message,
              InputProps: {
                startAdornment: icon,
                sx: {
                  height: 38,
                  backgroundColor: "white",
                  "& input": {
                    padding: "0 8px",
                    fontSize: "0.875rem", // optional
                  },
                },
              },
              inputProps: {
                style: {
                  height: "38px",
                  padding: 0,
                },
              },
              InputLabelProps: {
                sx: { top: "-7px" }, // adjust label alignment
              },
            },
          }}
        />
      )}
    />
  );
};

export default RHFTimePicker;
