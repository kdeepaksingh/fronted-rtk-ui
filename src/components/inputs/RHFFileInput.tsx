/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, type Control, type Path } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import AttachIcon from "@mui/icons-material/AttachFile";
import { t } from "i18next";

interface RHFFileInputProps<TFieldValues> {
  name: Path<TFieldValues>;
  control: Control<any>;
  label?: string;
  rules?: object;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
}

function RHFFileInput<TFieldValues>({
  name,
  control,
  label = "Upload File",
  rules,
  disabled = false,
  multiple = false,
  accept,
}: RHFFileInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const error = fieldState.error;

        return (
          <Box mt={2}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachIcon />}
              disabled={disabled}
              // MUI Button has no error prop, so just visually show error below
            >
              {t(label)}
              <input
                type="file"
                hidden
                multiple={multiple}
                accept={accept}
                onChange={(e) => field.onChange(e.target.files)}
              />
            </Button>

            {field.value?.length > 0 && (
              <Typography variant="caption" display="block" mt={1}>
                Selected:{" "}
                {Array.from(field.value)
                  .map((file) => file.name)
                  .join(", ")}
              </Typography>
            )}

            {/* Show validation error message below */}
            {error && (
              <Typography
                variant="caption"
                color="error"
                role="alert"
                mt={1}
                aria-live="assertive"
              >
                {error.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
}

export default RHFFileInput;
