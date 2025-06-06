import { TextField, InputAdornment } from "@mui/material";
import { t } from "i18next";
import { Controller, type Control, type FieldValues } from "react-hook-form";
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
  control: Control<FieldValues, unknown>;
  rules?: object;
  error?: string | boolean;
  defaultValue?: string;
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
                  {label}
                  {required && <span style={{ color: "red" }}> *</span>}
                </>
              }
              variant="outlined"
              type={type}
              onChange={(e) => {
                let val = FormValidationUtils.removeTag(e.target.value);
                if (maxCharCount) {
                  val = FormValidationUtils.removeExtraSpaces(val).substring(
                    0,
                    maxCharCount
                  );
                }
                onChange(val);
              }}
              onBlur={onBlur}
              placeholder={t(placeholder)}
              size="small"
              fullWidth
              value={value || ""}
              className="!text-sm input-plcholder-sigin"
              autoComplete="off"
              InputProps={{
                [`${position}Adornment`]: (
                  <>
                    {icon && (
                      <InputAdornment
                        position={position}
                        onClick={onIconClick}
                        className={`${onIconClick && "cursor-pointer"}`}
                      >
                        <Icon name={icon} />
                      </InputAdornment>
                    )}
                    <Condition show={!!helptooltip}>
                      <InputAdornment
                        className="absolute m-1 !bottom-[14px] !right-[0px]"
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
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        control={control}
        rules={{ required: "Name is required" }}
        required
        icon="User"
      /> */
}
