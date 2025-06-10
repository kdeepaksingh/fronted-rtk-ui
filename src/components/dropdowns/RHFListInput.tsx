import { useEffect, useState } from "react";
import { Controller, type Control } from "react-hook-form";
import {
  FormControl,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import colors from "../../color";
import Icon from "../icon/Icon";
import StringToHtml from "../typography/StringToHtml";
import Translate from "../typography/Translate";

interface ListInputProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  label?: string;
  data?: any[];
  required?: boolean;
  className?: string;
  dataID?: string;
  dataValue?: string;
  disabled?: boolean;
  showTooltipOnEmpty?: boolean;
  showTooltipOnEmptyPosition?: "top" | "bottom" | "left" | "right";
  sx?: object;
  multiple?: boolean;
  listWithIcon?: boolean;
  height?: string | number;
  render?: (item: any) => React.ReactNode;
  error?: boolean;
  renderValue?: any;
  allowClear?: boolean;
  rules?: object;
  allowEmpty?: boolean;
}

export const RHFListInput = ({
  name,
  control,
  placeholder = "",
  label = "",
  data = [],
  required = false,
  dataID = "id",
  dataValue = "value",
  disabled = false,
  showTooltipOnEmpty = false,
  showTooltipOnEmptyPosition = "top",
  sx = {},
  listWithIcon = false,
  render,
  error = false,
  rules = {},
  allowEmpty = false,
}: ListInputProps) => {
  const [showToolTip, setShowToolTip] = useState(false);
  useEffect(() => {
    let isMounted = true;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (showTooltipOnEmpty && !showToolTip) {
      timeout = setTimeout(() => {
        if (isMounted) setShowToolTip(true);
      }, 500);
    } else {
      clearTimeout(timeout);
      if (isMounted) setShowToolTip(false);
    }

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [showTooltipOnEmpty]);

  return (
    <FormControl
      fullWidth
      size="small"
      sx={{
        mb: 2,
        ...(error && {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#d32f2f",
            },
          },
        }),
        ...sx,
      }}
      className={disabled ? "opacity-50" : ""}
      error={error}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          const selectedValue = data?.length ? value : "";

          return (
            <Tooltip
              arrow
              title={
                showTooltipOnEmpty && !value ? (
                  <Translate
                    dataKey={"Typo.SelectOnEmpty"}
                    params={{ label }}
                    htmlContent
                  />
                ) : (
                  ""
                )
              }
              open={showToolTip && !value}
              placement={showTooltipOnEmptyPosition}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: colors["ui-danger"],
                    "& .MuiTooltip-arrow": {
                      color: colors["ui-danger"],
                    },
                  },
                },
              }}
            >
              <TextField
                select
                fullWidth
                required={required}
                size="small"
                disabled={disabled}
                label={label}
                value={selectedValue ?? ""}
                onChange={(e) => onChange(e.target.value)}
                error={error}
                variant="outlined"
                InputLabelProps={{ shrink: true }} // ✅ fixes overlapping label
                SelectProps={{
                  displayEmpty: true,
                }}
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#d32f2f",
                  },
                }}
              >
                {placeholder && (
                  <MenuItem
                    value=""
                    disabled={!allowEmpty}
                    style={!allowEmpty ? { display: "none" } : {}}
                  >
                    <span style={{ color: "#888" }}>{placeholder}</span>
                  </MenuItem>
                )}

                {data?.map((item: Record<string, any>) => (
                  <MenuItem key={item?.[dataID]} value={item?.[dataID]}>
                    {listWithIcon && item.icon && (
                      <Icon name={item.icon as string} className="mr-2 -ml-2" />
                    )}
                    {render ? render(item) : <StringToHtml text={item?.[dataValue]} />}
                  </MenuItem>
                ))}
              </TextField>
            </Tooltip>
          );
        }}
      />
    </FormControl>
  );
};

export default RHFListInput;



// import { useEffect, useState } from "react";
// import { Controller, type Control } from "react-hook-form";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Tooltip,
// } from "@mui/material";
// import Clear from "@mui/icons-material/Clear";
// import colors from "../../color";
// import Icon from "../icon/Icon";
// import StringToHtml from "../typography/StringToHtml";
// import Translate from "../typography/Translate";

// interface ListInputProps {
//   name: string;
//   control: Control<any>;
//   placeholder?: string;
//   label?: string;
//   data?: any[];
//   required?: boolean;
//   className?: string;
//   dataID?: string;
//   dataValue?: string;
//   disabled?: boolean;
//   showTooltipOnEmpty?: boolean;
//   showTooltipOnEmptyPosition?: "top" | "bottom" | "left" | "right";
//   sx?: object;
//   multiple?: boolean;
//   listWithIcon?: boolean;
//   height?: string | number;
//   render?: (item: any) => React.ReactNode;
//   error?: boolean;
//   renderValue?: any;
//   allowClear?: boolean;
//   rules?: object;
//   allowEmpty?: boolean;
// }

// export const RHFListInput = ({
//   name,
//   control,
//   placeholder = "",
//   label = "",
//   data = [],
//   required = false,
//   dataID = "id",
//   dataValue = "value",
//   disabled = false,
//   showTooltipOnEmpty = false,
//   showTooltipOnEmptyPosition = "top",
//   sx = {},
//   multiple = false,
//   listWithIcon = false,
//   height = "auto",
//   render,
//   error = false,
//   renderValue,
//   allowClear = false,
//   rules = {},
//   allowEmpty = false,
// }: ListInputProps) => {
//   const [showToolTip, setShowToolTip] = useState(false);
//   const labelId = `${name}-label`;

//   useEffect(() => {
//     let isMounted = true;
//     let interval: ReturnType<typeof setTimeout> | undefined = undefined;

//     if (showTooltipOnEmpty && !showToolTip) {
//       interval = setTimeout(() => {
//         if (isMounted) setShowToolTip(true);
//       }, 500);
//     } else {
//       if (interval !== undefined) clearTimeout(interval);
//       if (isMounted) setShowToolTip(false);
//     }

//     return () => {
//       isMounted = false;
//       clearTimeout(interval);
//     };
//   }, [showTooltipOnEmpty]);

//   return (
//     <FormControl
//       fullWidth
//       size="small"
//       sx={{ mb: 2, ...sx }}
//       className={disabled ? "opacity-50" : ""}
//       error={error}
//     >
//       {label && (
//         <InputLabel id={labelId} htmlFor={name} required={required} shrink>
//           {label}
//         </InputLabel>
//       )}

//       <Controller
//         name={name}
//         control={control}
//         rules={rules}
//         render={({ field }) => {
//           const { onChange, value } = field;
//           const listValue = data?.length ? value : multiple ? [] : "";

//           return (
//             <Tooltip
//               arrow
//               title={
//                 <Translate
//                   dataKey={"Typo.SelectOnEmpty"}
//                   params={{ label }}
//                   htmlContent
//                 />
//               }
//               placement={showTooltipOnEmptyPosition}
//               open={showToolTip}
//               componentsProps={{
//                 tooltip: {
//                   sx: {
//                     bgcolor: colors["ui-danger"],
//                     "& .MuiTooltip-arrow": {
//                       color: colors["ui-danger"],
//                     },
//                   },
//                 },
//               }}
//             >
//               <Select
//                 labelId={labelId}
//                 id={name}
//                 label={label}
//                 value={listValue ?? (multiple ? [] : "")}
//                 onChange={onChange}
//                 disabled={disabled}
//                 multiple={multiple}
//                 displayEmpty
//                 renderValue={renderValue}
//                 MenuProps={{
//                   PaperProps: {
//                     style: {
//                       maxHeight: height,
//                     },
//                   },
//                 }}
//                 endAdornment={
//                   allowClear &&
//                   Boolean(
//                     multiple ? (listValue as any[])?.length : listValue
//                   ) && (
//                     <Clear
//                       fontSize="inherit"
//                       onClick={() => onChange("")}
//                       className="cursor-pointer mr-3"
//                     />
//                   )
//                 }
//               >
//                 {placeholder && (
//                   <MenuItem
//                     value=""
//                     disabled={!allowEmpty}
//                     className={(!allowEmpty && "!hidden") || ""}
//                   >
//                     <span className="text-gray-400">
//                       {Array.isArray(listValue) && (listValue as any[]).length
//                         ? "NONE"
//                         : placeholder}
//                     </span>
//                   </MenuItem>
//                 )}

//                 {data?.map((item: Record<string, any>) => (
//                   <MenuItem key={item?.[dataID]} value={item?.[dataID]}>
//                     {listWithIcon && item.icon && (
//                       <Icon name={item.icon as string} className="mr-2 -ml-2" />
//                     )}
//                     {render ? (
//                       render(item)
//                     ) : (
//                       <StringToHtml text={item?.[dataValue]} />
//                     )}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Tooltip>
//           );
//         }}
//       />
//     </FormControl>
//   );
// };

// export default RHFListInput;

// import { useEffect, useState } from "react";
// import { Controller, type Control } from "react-hook-form";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import Tooltip from "@mui/material/Tooltip";
// import Clear from "@mui/icons-material/Clear";

// import Condition from "../commons/Condition";
// import Translate from "../typography/Translate";
// import colors from "../../color";
// import Icon from "../icon/Icon";
// import StringToHtml from "../typography/StringToHtml";
// import InputLabel from "../inputs/InputLabel";

// interface ListInputProps {
//   name: string;
//   control: Control<any>;
//   placeholder?: string;
//   label?: string;
//   data?: any[];
//   required?: boolean;
//   className?: string;
//   dataID?: string;
//   dataValue?: string;
//   disabled?: boolean;
//   showTooltipOnEmpty?: boolean;
//   showTooltipOnEmptyPosition?: "top" | "bottom" | "left" | "right";
//   sx?: object;
//   multiple?: boolean;
//   listWithIcon?: boolean;
//   height?: string | number;
//   render?: (item: any) => React.ReactNode;
//   error?: boolean;
//   renderValue?: any;
//   allowClear?: boolean;
//   rules?: object;
//   allowEmpty?: boolean;
// }

// export const RHFListInput = ({
//   name,
//   control,
//   placeholder = "",
//   label = "",
//   data = [],
//   required = false,
//   className = "min-w-upag-input",
//   dataID = "id",
//   dataValue = "value",
//   disabled = false,
//   showTooltipOnEmpty = false,
//   showTooltipOnEmptyPosition = "top",
//   sx = {},
//   multiple = false,
//   listWithIcon = false,
//   height = "auto",
//   render,
//   error = false,
//   renderValue,
//   allowClear = false,
//   rules = {},
//   allowEmpty = false,
// }: ListInputProps) => {
//   const [showToolTip, setShowToolTip] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     let interval: ReturnType<typeof setTimeout> | undefined = undefined;

//     if (showTooltipOnEmpty && !showToolTip) {
//       interval = setTimeout(() => {
//         if (isMounted) setShowToolTip(true);
//       }, 500);
//     } else {
//       if (interval !== undefined) clearTimeout(interval);
//       if (isMounted) setShowToolTip(false);
//     }

//     return () => {
//       isMounted = false;
//       clearTimeout(interval);
//     };
//   }, [showTooltipOnEmpty]);

//   return (
//     <div className={`relative ${disabled ? "opacity-50" : ""}`}>
//       <Condition show={Boolean(label)}>
//         <InputLabel label={label} required={required} className="font-semibold" />
//       </Condition>

//       <Controller
//         name={name}
//         control={control}
//         rules={rules}
//         render={({ field }) => {
//           const { onChange, value } = field;
//           const listValue = data?.length
//             ? value
//             : multiple
//             ? []
//             : "";

//           return (
//             <Tooltip
//               arrow
//               title={
//                 <Translate
//                   dataKey={"Typo.SelectOnEmpty"}
//                   params={{ label }}
//                   htmlContent
//                 />
//               }
//               placement={showTooltipOnEmptyPosition}
//               open={showToolTip}
//               componentsProps={{
//                 tooltip: {
//                   sx: {
//                     bgcolor: colors["ui-danger"],
//                     "& .MuiTooltip-arrow": {
//                       color: colors["ui-danger"],
//                     },
//                   },
//                 },
//               }}
//             >
//               <Select
//                 onChange={onChange}
//                 className={`${className} !text-sm`}
//                 size="small"
//                 displayEmpty
//                 value={listValue}
//                 disabled={disabled}
//                 sx={sx}
//                 multiple={multiple}
//                 autoComplete="off"
//                 fullWidth
//                 renderValue={renderValue as ((selected: any) => React.ReactNode) | undefined}
//                 MenuProps={{
//                   PaperProps: {
//                     style: {
//                       maxHeight: height,
//                     },
//                   },
//                 }}
//                 error={error}
//                 endAdornment={
//                   allowClear &&
//                   Boolean(multiple ? (listValue as any[])?.length : listValue) && (
//                     <Clear
//                       fontSize="inherit"
//                       onClick={() => onChange("")}
//                       className="cursor-pointer mr-3"
//                     />
//                   )
//                 }
//               >
//                 {placeholder && (
//                   <MenuItem
//                     value=""
//                     disabled={!allowEmpty}
//                     className={(!allowEmpty && "!hidden") || ""}
//                   >
//                     <span className="text-gray-400">
//                       {Array.isArray(listValue) && (listValue as any[]).length ? "NONE" : placeholder}
//                     </span>
//                   </MenuItem>
//                 )}
//                 {data?.map((item: Record<string, any>) => (
//                   <MenuItem
//                     key={item?.[dataID]}
//                     value={item?.[dataID]}
//                     className="text-sm"
//                   >
//                     {listWithIcon && item.icon && (
//                       <Icon name={item.icon as string} className="mr-2 -ml-2" />
//                     )}
//                     {render ? render(item) : <StringToHtml text={item?.[dataValue]} />}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Tooltip>
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default RHFListInput;
