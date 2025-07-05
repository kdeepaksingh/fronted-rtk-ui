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
  defaultValue = "",
}: RHFTextInputProps) => {
  return (
    <div style={{ marginBottom, width: "100%" }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => {
          const { onChange, onBlur, value, ref } = field;
          const errMsg = error?.message || "";

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
                  val = val.replace(/\D/g, "");
                  if (val.length > 0 && !/^[6-9]/.test(val)) {
                    // optional warning
                  }
                  if (maxCharCount) val = val.substring(0, maxCharCount);
                } else if (type === "email") {
                  val = val
                    .replace(/[^a-zA-Z0-9@._-]/g, "")
                    .replace(/\s+/g, "");
                } else if (type === "password") {
                  val = val.trim(); // ✅ Trim whitespace
                  // Optional: prevent all spaces → val = val.replace(/\s/g, "");
                } else {
                  val = val
                    .replace(/[^A-Za-z\s]/g, "")
                    .replace(/\s+/g, " ")
                    .trimStart();
                  if (maxCharCount) val = val.substring(0, maxCharCount);
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
                componentsProps: {
                  input: {
                    tabIndex: 0,
                    autoComplete: "off",
                  },
                },
              }}
              error={!!error}
              helperText={errMsg}
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
