/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import Condition from "../commons/Condition";

type ToggleOption = {
  value: string | number;
  label: string;
};

type ToggleSwitchProps = {
  name: string;
  control: Control<any>;
  options: ToggleOption[];
  label?: string;
  required?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  disabled?: boolean;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  control,
  options = [],
  label = "",
  required = false,
  color = "error",
  disabled = false,
}) => {
  return (
    <div className="toggle-switch">
      <div className="leading-loose text-sm flex gap-2 items-center">
        <Condition show={Boolean(label)}>
          <div>
            {label}
            <Condition show={required}>
              <span className="text-upag-danger">*</span>
            </Condition>
          </div>
        </Condition>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              color={color}
              value={field.value}
              exclusive
              onChange={(_, val) => {
                if (val !== null) field.onChange(val);
              }}
              aria-label="Toggle Switch"
              disabled={disabled}
              size="small"
            >
              {options.map((item) => (
                <ToggleButton
                  value={item.value}
                  key={item.value}
                  className="!py-1 !font-semibold"
                >
                  <span className="mr-1 pointer-events-none">
                    {String(item.value) === String(field.value) ? (
                      <CheckBox fontSize="small" />
                    ) : (
                      <CheckBoxOutlineBlank fontSize="small" />
                    )}
                  </span>
                  <span className="capitalize pointer-events-none">
                    {item.label}
                  </span>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;

// import { useForm, SubmitHandler } from "react-hook-form";
// import ToggleSwitch from "./components/form/ToggleSwitch";

// type FormValues = {
//   reportType: string;
// };

// const options = [
//   { value: "summary", label: "Summary" },
//   { value: "detailed", label: "Detailed" },
// ];

// const MyForm = () => {
//   const { control, handleSubmit } = useForm<FormValues>({
//     defaultValues: {
//       reportType: "summary",
//     },
//   });

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <ToggleSwitch
//         name="reportType"
//         control={control}
//         options={options}
//         label="Report Type"
//         required
//         color="primary"
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };
