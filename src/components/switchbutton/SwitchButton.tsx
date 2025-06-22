/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material";
import Translate from "../typography/Translate";

type SwitchButtonProps = {
  name: string;
  title: string;
  label: string;
  control: Control<any>;
  disabled?: boolean;
  className?: string;
};

const IOSSwitch = styled((props: any) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 30,
  height: 16,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 0,
    transform: "translateX(1px) translateY(1px)",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(15px) translateY(1px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#F9C459",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled+.MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      backgroundColor: "#cccccc",
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 14,
    height: 14,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#BCD5F0" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const SwitchButton: React.FC<SwitchButtonProps> = ({
  name,
  title,
  label,
  control,
  disabled = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          labelPlacement="start"
          control={
            <IOSSwitch
              sx={{ m: 1 }}
              checked={field.value}
              onChange={(e: { target: { checked: any } }) =>
                field.onChange(e.target.checked)
              }
              size="small"
              disabled={disabled}
            />
          }
          label={
            <Translate dataKey={title} params={{ label }} className="text-sm" />
          }
          className="!mr-1"
        />
      )}
    />
  );
};

export default SwitchButton;

// import { useForm, SubmitHandler } from "react-hook-form";
// import SwitchButton from "./components/form/SwitchButton";

// type FormValues = {
//   isActive: boolean;
// };

// const MyForm = () => {
//   const { control, handleSubmit } = useForm<FormValues>({
//     defaultValues: {
//       isActive: true,
//     },
//   });

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     console.log("Form Data", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <SwitchButton
//         name="isActive"
//         title="Form.Active"
//         label="User"
//         control={control}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };
