/* eslint-disable @typescript-eslint/no-unused-vars */
import { Autocomplete, TextField } from "@mui/material";
import { capitalize } from "lodash";
import { useEffect, useState } from "react";
const formatText = (v: string | undefined, caps: boolean = true): string =>
  caps ? capitalize(String(v || "").toLowerCase()) : v || "";

export const ListAutoComplete = ({
  options = [],
  value = "",
  label = "",
  dataKey = "",
  onChange = (_item: Record<string, string | number | boolean>) => {},
  onClear = () => {},
  caps = true,
  loading = false,
  size = "medium" as "small" | "medium" | undefined,
}) => {
  const [inputChange, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(formatText(value, caps));
  }, [value, caps]);

  return (
    <Autocomplete
      options={options}
      size={size}
      getOptionLabel={(option: Record<string, string | number | boolean>) =>
        formatText(String(option[dataKey as keyof typeof option]), caps)
      }
      onChange={(_e, item, reason) => {
        onChange(item || ({} as Record<string, string | number | boolean>));
        if (reason === "clear") {
          onClear();
        }
      }}
      autoComplete
      includeInputInList
      value={{ [dataKey]: formatText(value, caps) }}
      inputValue={inputChange}
      onInputChange={(_event, newInputValue) => {
        if (newInputValue) {
          setInputValue(newInputValue);
        }
      }}
      loading={loading}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
          />
        );
      }}
    />
  );
};
