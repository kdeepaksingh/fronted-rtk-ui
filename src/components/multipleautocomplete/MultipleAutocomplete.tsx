/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type MultipleAutocompleteProps = {
  name: string;
  label: string;
  control: Control<any>;
  data: string[];
  required?: boolean;
  disabled?: boolean;
};

const MultipleAutocomplete: React.FC<MultipleAutocompleteProps> = ({
  name,
  label,
  control,
  data = [],
  required = false,
  disabled = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          options={data}
          value={value || []}
          getOptionLabel={(option) => option}
          onChange={(_, data) => onChange(data)}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              variant="outlined"
              label={
                required ? (
                  <>
                    {label} <span style={{ color: "red" }}>*</span>
                  </>
                ) : (
                  label
                )
              }
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      )}
    />
  );
};

export default MultipleAutocomplete;

// <MultipleAutocomplete
//   name="skills"
//   label="Skills"
//   control={control}
//   data={["React", "TypeScript", "Redux"]}
//   required
// />

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Controller } from "react-hook-form";
// import type { Control } from "react-hook-form";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import InputLabel from "../inputs/InputLabel";

// type MultipleAutocompleteProps = {
//   name: string;
//   label: string;
//   control: Control<any>; // You can strongly type this if you know your form shape
//   data: string[]; // If it's object array, adjust this type
//   required?: boolean;
//   disabled?: boolean;
// };

// const MultipleAutocomplete: React.FC<MultipleAutocompleteProps> = ({
//   name,
//   label,
//   control,
//   data = [],
//   required,
//   disabled = false,
// }) => {
//   return (
//     <>
//       <InputLabel label={label} required={required} />
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={[]}
//         render={({
//           field: { onChange, value, ref },
//           fieldState: { error },
//         }) => (
//           <Autocomplete
//             multiple
//             options={data}
//             value={value || []}
//             getOptionLabel={(option) => option}
//             onChange={(_, data) => onChange(data)}
//             disabled={disabled}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 inputRef={ref}
//                 variant="outlined"
//                 error={!!error}
//                 helperText={error?.message}
//               />
//             )}
//           />
//         )}
//       />
//     </>
//   );
// };

// export default MultipleAutocomplete;
