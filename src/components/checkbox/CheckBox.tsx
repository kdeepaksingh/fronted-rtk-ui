import { Checkbox as UICheckbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import Translate from "../typography/Translate";

interface RHFCheckboxProps {
  name: string;
  control: Control<Record<string, unknown>>;
  text?: string;
  size?: "small" | "medium";
  className?: string;
  disabled?: boolean;
}

const RHFCheckbox = ({
  name,
  control,
  text = "",
  size = "small",
  className,
  disabled = false,
}: RHFCheckboxProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = false, onChange } }) => (
        <FormControlLabel
          control={
            <UICheckbox
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              size={size}
              className="!p-1"
              disabled={disabled}
            />
          }
          label={<Translate dataKey={text} />}
          className={className}
        />
      )}
    />
  );
};

export default RHFCheckbox;

// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import RHFCheckbox from "./RHFCheckbox"; // adjust import path

// type FormValues = {
//   agreeToTerms: boolean;
// };

// const ExampleForm: React.FC = () => {
//   const { handleSubmit, control } = useForm<FormValues>({
//     defaultValues: {
//       agreeToTerms: false,
//     },
//   });

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     console.log("Form submitted:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <RHFCheckbox
//         name="agreeToTerms"
//         control={control}
//         text="Label.AgreeToTerms"
//       />
//       <button type="submit" className="mt-4 btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ExampleForm;
