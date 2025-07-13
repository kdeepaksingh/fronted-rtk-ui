/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import type { Control, Path } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { TextField, InputAdornment } from "@mui/material";
import Help from "@mui/icons-material/Help";
import dayjs from "dayjs";
import Icon from "../icon/Icon";
import HelpTextIcon from "../buttons/HelpTextIcon";
import Condition from "../commons/Condition";
import { t } from "i18next";

interface RHFDateInputProps<TFieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  icon?: string;
  required?: boolean | string;
  disabled?: boolean;
  marginBottom?: number;
  helptooltip?: string;
  onIconClick?: () => void;
  control: Control<any>;
  rules?: object;
  error?: string | boolean;
  defaultValue?: string | null;
  className?: string;
}

function RHFDateInput<TFieldValues>({
  name,
  label = "",
  icon,
  required = false,
  disabled = false,
  marginBottom = 8,
  helptooltip = "",
  onIconClick,
  control,
  rules,
  error,
  //   defaultValue = null,
  className,
}: RHFDateInputProps<TFieldValues>) {
  return (
    <div style={{ marginBottom }} className={`!w-full ${className}`}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        // defaultValue={defaultValue}
        render={({ field: { onChange, value, ref }, fieldState }) => (
          <ReactDatePicker
            wrapperClassName="w-full"
            // popperClassName="w-full"
            selected={value ? new Date(value) : null}
            onChange={(date: Date | null) =>
              onChange(date ? dayjs(date).toISOString() : null)
            }
            customInput={
              <TextField
                inputRef={ref}
                fullWidth
                size="small"
                variant="outlined"
                label={
                  <>
                    {t(label)}
                    {required && <span style={{ color: "red" }}> *</span>}
                  </>
                }
                error={!!fieldState.error || !!error}
                helperText={fieldState.error?.message || error || ""}
                disabled={disabled}
                InputProps={{
                  endAdornment: (
                    <>
                      {icon && (
                        <InputAdornment
                          position="end"
                          onClick={onIconClick}
                          className={`!text-amber-600 ${
                            onIconClick ? "cursor-pointer" : ""
                          }`}
                        >
                          <Icon name={icon} />
                        </InputAdornment>
                      )}
                      <Condition show={!!helptooltip}>
                        <InputAdornment
                          className="absolute m-1 !right-[0px] !text-white font-semibold rounded-full bg-amber-700"
                          position="end"
                        >
                          <HelpTextIcon tooltip={helptooltip} icon={<Help />} />
                        </InputAdornment>
                      </Condition>
                    </>
                  ),
                }}
              />
            }
            dateFormat="dd-MM-YYYY"
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}

export default RHFDateInput;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { TextField, InputAdornment } from "@mui/material";
// import { Controller, type Control } from "react-hook-form";
// import Help from "@mui/icons-material/Help";
// import Condition from "../commons/Condition";
// import Icon from "../icon/Icon";
// import HelpTextIcon from "../buttons/HelpTextIcon";

// interface RHFDateInputProps {
//   name: string;
//   label?: string;
//   icon?: string;
//   required?: boolean | string;
//   disabled?: boolean;
//   marginBottom?: number;
//   helptooltip?: string;
//   onIconClick?: () => void;
//   control: Control<any>;
//   rules?: object;
//   error?: string | boolean;
//   defaultValue?: string;
//   className?: string;
// }

// const RHFDateInput = ({
//   name,
//   label = "",
//   icon,
//   required = false,
//   disabled = false,
//   marginBottom = 8,
//   helptooltip = "",
//   onIconClick,
//   control,
//   rules,
//   error,
//   defaultValue = "",
// }: RHFDateInputProps) => {
//   return (
//     <div style={{ marginBottom }}>
//       <Controller
//         name={name}
//         control={control}
//         rules={rules}
//         defaultValue={defaultValue}
//         render={({ field }) => {
//           const { onChange, onBlur, value, ref } = field;

//           return (
//             <TextField
//               inputRef={ref}
//               label={
//                 <>
//                   {label}
//                   {required && <span style={{ color: "red" }}> *</span>}
//                 </>
//               }
//               variant="outlined"
//               type="date"
//               onChange={onChange}
//               onBlur={onBlur}
//               size="small"
//               fullWidth
//               value={value || ""}
//               className="!text-sm !mb-2"
//               InputLabelProps={{ shrink: true }}
//               InputProps={{
//                 endAdornment: (
//                   <>
//                     {icon && (
//                       <InputAdornment
//                         position="end"
//                         onClick={onIconClick}
//                         className={`!text-amber-600 ${
//                           onIconClick && "cursor-pointer"
//                         }`}
//                       >
//                         <Icon name={icon} />
//                       </InputAdornment>
//                     )}
//                     <Condition show={!!helptooltip}>
//                       <InputAdornment
//                         className="absolute m-1 !right-[0px] !text-white font-semibold rounded-full bg-amber-700"
//                         position="end"
//                       >
//                         <HelpTextIcon tooltip={helptooltip} icon={<Help />} />
//                       </InputAdornment>
//                     </Condition>
//                   </>
//                 ),
//                 componentsProps: {
//                   input: {
//                     tabIndex: 0,
//                     autoComplete: "off",
//                   },
//                 },
//               }}
//               error={Boolean(error)}
//               helperText={error || ""}
//               disabled={disabled}
//             />
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default RHFDateInput;
