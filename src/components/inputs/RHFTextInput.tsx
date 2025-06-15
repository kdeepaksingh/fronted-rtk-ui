/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, InputAdornment } from "@mui/material";
import { t } from "i18next";
import { Controller, type Control } from "react-hook-form";
// type FieldValues
import Help from "@mui/icons-material/Help";
import Condition from "../commons/Condition";
import Icon from "../icon/Icon";
import HelpTextIcon from "../buttons/HelpTextIcon";
import FormValidationUtils from "../../utils/FormValidationsUtils";

interface RHFTextInputProps {
  name: string;
  label?: string;
  icon?: string;
  placeholder?: string;
  type?: string;
  position?: "start" | "end";
  required?: boolean | string;
  disabled?: boolean;
  marginBottom?: number;
  maxCharCount?: number;
  helptooltip?: string;
  onIconClick?: () => void;
  control: Control<any>;
  rules?: object;
  error?: string | boolean;
  defaultValue?: string;
  className?: string;
}

const RHFTextInput = ({
  name,
  label = "",
  icon,
  placeholder = "",
  type = "text",
  position = "end",
  required = false,
  disabled = false,
  marginBottom = 8,
  maxCharCount = 0,
  helptooltip = "",
  onIconClick,
  control,
  rules,
  error,
  defaultValue = "",
}: RHFTextInputProps) => {
  return (
    <div style={{ marginBottom }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => {
          const { onChange, onBlur, value, ref } = field;

          return (
            <TextField
              inputRef={ref}
              label={
                <>
                  {t(label)}
                  {required && <span style={{ color: "red" }}> *</span>}
                </>
              }
              variant="outlined"
              type={type}
              onChange={(e) => {
                let val = FormValidationUtils.removeTag(e.target.value);

                if (type === "tel") {
                  val = val.replace(/\D/g, ""); // ✅ Allow only digits

                  // ✅ Show warning if first digit isn't 6–9
                  if (val.length > 0 && !/^[6-9]/.test(val)) {
                    // Optionally show live error or feedback — see suggestions below
                    // Example: toast.error("Mobile number must start with 6, 7, 8 or 9");
                  }
                  if (maxCharCount) {
                    val = val.substring(0, maxCharCount);
                  }
                } else if (type === "email") {
                  // ✅ Allow only valid email characters (basic filter)
                  val = val.replace(/[^a-zA-Z0-9@._-]/g, ""); // restrict to valid email chars
                  val = val.replace(/\s+/g, ""); // remove any spaces
                  // Optional: You can add stricter checks, but RHF's `pattern` will do full validation
                } else {
                  val = val.replace(/[^A-Za-z\s]/g, ""); // ✅ Keep only letters and spaces

                  val = val.replace(/\s+/g, " "); // ✅ Replace multiple spaces with a single space

                  val = val.trimStart(); // // ✅ Remove leading and trailing spaces
                  // ✅ Apply max length restriction
                  if (maxCharCount) {
                    val = val.substring(0, maxCharCount);
                  }
                }
                onChange(val);
              }}
              onBlur={onBlur}
              placeholder={t(placeholder)}
              size="small"
              fullWidth
              value={value || ""}
              className="!text-sm !mb-2"
              autoComplete="off"
              InputProps={{
                [`${position}Adornment`]: (
                  <>
                    {icon && (
                      <InputAdornment
                        position={position}
                        onClick={onIconClick}
                        className={`!text-amber-600 ${
                          onIconClick && "cursor-pointer"
                        }`}
                      >
                        <Icon name={icon} />
                      </InputAdornment>
                    )}
                    <Condition show={!!helptooltip}>
                      <InputAdornment
                        className="absolute m-1 !right-[0px] !text-white font-semibold rounded-full bg-amber-700 "
                        position="end"
                      >
                        <HelpTextIcon tooltip={helptooltip} icon={<Help />} />
                      </InputAdornment>
                    </Condition>
                  </>
                ),
                componentsProps: {
                  input: {
                    tabIndex: 0,
                    autoComplete: "off",
                  },
                },
              }}
              error={Boolean(error)}
              helperText={error || ""}
              disabled={disabled}
            />
          );
        }}
      />
    </div>
  );
};

export default RHFTextInput;

{
  /* <RHFTextInput
            type="text"
            name="fullName"
            placeholder={"Placeholder.EnterFullName"}
            label={"Label.FullName"}
            control={control}
            maxCharCount={20}
            required
            rules={{
              required: "Full Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters are allowed in full name",
              },
            }}
            // helptooltip={"Only letters are allowed"}
            icon={"Person"}
          /> */
}
