/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, type Control, type Path } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import AttachIcon from "@mui/icons-material/AttachFile";

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
      render={({ field }) => (
        <Box mt={2}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<AttachIcon />}
            disabled={disabled}
          >
            {label}
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
        </Box>
      )}
    />
  );
}

export default RHFFileInput;
