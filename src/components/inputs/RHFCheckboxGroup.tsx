import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

interface CheckboxOption {
  key: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  label?: string;
  control: Control<FieldValues, any>;
  required?: boolean;
  disabled?: boolean;
  data: CheckboxOption[];
  rules?: object;
  error?: string | boolean;
  defaultValue?: string[];
}

const RHFCheckboxGroup = ({
  name,
  label = "",
  control,
  required = false,
  disabled = false,
  data = [],
  rules = {},
  error,
  defaultValue = [],
}: CheckboxGroupProps) => {
  return (
    <FormControl component="fieldset" error={Boolean(error)} sx={{ width: "100%" }}>
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
        render={({ field }) => {
          const { value = [], onChange } = field;

          const handleToggle = (checkedValue: string) => {
            const newValue = value.includes(checkedValue)
              ? value.filter((val: string) => val !== checkedValue)
              : [...value, checkedValue];
            onChange(newValue);
          };

          return (
            <FormGroup row>
              {data.map((item) => (
                <FormControlLabel
                  key={item.key}
                  control={
                    <Checkbox
                      checked={value.includes(item.key)}
                      onChange={() => handleToggle(item.key)}
                      disabled={disabled}
                      size="small"
                    />
                  }
                  label={item.label}
                />
              ))}
            </FormGroup>
          );
        }}
      />

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default RHFCheckboxGroup;



{/* <RHFCheckboxGroup
        name="hobbies"
        label="Select Hobbies"
        control={control}
        required
        rules={{ validate: (val: string[]) => val.length > 0 || "Select at least one hobby" }}
        // error={errors.hobbies?.message as string}
        data={[
          { key: "reading", label: "Reading" },
          { key: "traveling", label: "Traveling" },
          { key: "coding", label: "Coding" },
        ]}
      /> */}
