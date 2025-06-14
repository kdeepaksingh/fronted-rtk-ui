/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, InputAdornment } from "@mui/material";
import Help from "@mui/icons-material/Help";
import { Controller } from "react-hook-form";
import type { Control, FieldValues } from "react-hook-form";
import { t } from "i18next";
import FormValidationUtils from "../../utils/FormValidationsUtils";
import Condition from "../commons/Condition";
import HelpTextIcon from "../buttons/HelpTextIcon";

interface RHFTextAreaProps {
  name: string;
  control: Control<FieldValues, any>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | boolean;
  rows?: number;
  maxCharCount?: number;
  helptooltip?: string;
  rules?: object;
  defaultValue?: string;
  value?: any;
  maxHeight?: any;
  className?: string;
  autoFocus?: any;
}

const RHFTextArea = ({
  name,
  control,
  label = "",
  placeholder = "",
  required = false,
  disabled = false,
  error = false,
  rows = 4,
  maxCharCount = 0,
  helptooltip = "",
  rules = {},
  defaultValue = "",
}: RHFTextAreaProps) => {
  return (
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
            placeholder={t(placeholder)}
            multiline
            fullWidth
            rows={rows}
            variant="outlined"
            size="small"
            value={value || ""}
            onChange={(e) => {
              let val = FormValidationUtils.removeTag(e.target.value);

              val = val.replace(/[0-9]/g, ""); // ✅ Remove all digits (0–9)

              val = val.replace(/\s+/g, " "); // ✅ Replace multiple spaces with a single space

              val = val.trimStart(); // ✅ Optionally trim leading space (but allow trailing space while typing)

              if (maxCharCount) {
                val = val.substring(0, maxCharCount); // ✅ Apply max character count if needed
              }

              onChange(val);
            }}
            onBlur={onBlur}
            disabled={disabled}
            className="!mb-2"
            error={Boolean(error)}
            helperText={error || ""}
            InputProps={{
              endAdornment: (
                <Condition show={!!helptooltip}>
                  <InputAdornment
                    className="absolute m-1 !right-0 !bottom-[-0px] !text-white !font-semibold rounded-full bg-amber-700"
                    position="end"
                  >
                    <HelpTextIcon tooltip={helptooltip} icon={<Help />} />
                  </InputAdornment>
                </Condition>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default RHFTextArea;

{
  /* <RHFTextArea
        name="remarks"
        label="Remarks"
        placeholder="Enter your remarks"
        control={control}
        rules={{ required: "Remarks are required" }}
        helptooltip="Please share relevant details"
        maxCharCount={500}
        required
      /> */
}
