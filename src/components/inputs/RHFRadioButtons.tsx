import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

interface RHFRadioButtonsProps {
  name: string;
  control: Control<any>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  data: { key: string; label: string }[];
  rules?: object;
  error?: string | boolean;
  defaultValue?: string;
  className?: string;
  row?: boolean;
}

const RHFRadioButtons = ({
  name,
  control,
  label,
  required = false,
  disabled = false,
  data = [],
  rules = {},
  error,
  defaultValue = "",
  className,
  row = false,
}: RHFRadioButtonsProps) => {
  return (
    <FormControl
      component="fieldset"
      error={Boolean(error)}
      sx={{ width: "100%" }}
      className={className}
    >
      {label && (
        <FormLabel component="legend">
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </FormLabel>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup {...field} row={row}>
            {data.map((item) => (
              <FormControlLabel
                key={item.key}
                value={item.key}
                control={<Radio size="small" disabled={disabled} />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        )}
      />

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default RHFRadioButtons;

{
  /* <RHFRadioButtons
        name="gender"
        label="Gender"
        control={control}
        data={[
          { key: "male", label: "Male" },
          { key: "female", label: "Female" },
          { key: "other", label: "Other" },
        ]}
        rules={{ required: "Please select a gender" }}
        // error={errors.gender?.message as string}
      /> */
}
