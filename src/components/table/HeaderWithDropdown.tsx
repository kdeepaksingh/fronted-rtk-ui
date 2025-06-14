/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import React from "react";
import RHFListInput from "../dropdowns/RHFListInput";

interface HeaderComponentParams extends Partial<any> {
  labelSize?: number;
  inputSize?: number;
  onChange?: (event: any, props: HeaderWithDropdownProps) => void;
  dynamicProps?: (props: HeaderWithDropdownProps) => Partial<any>;
}

interface Column {
  colDef?: {
    headerComponentParams?: HeaderComponentParams;
  };
}

interface Data {
  isFooter?: boolean;
  [key: string]: any;
}

export interface HeaderWithDropdownProps {
  displayName: string;
  data: Data;
  column?: Column;
  value?: any;
}

export const HeaderWithDropdown: React.FC<HeaderWithDropdownProps> = (
  props
) => {
  const { displayName, data, column = {}, value } = props;

  const {
    labelSize = 6,
    inputSize = 6,
    onChange = () => {},
    dynamicProps = () => ({}),
    ...dropdownProps
  } = column.colDef?.headerComponentParams || {};

  if (data.isFooter) return null;

  return (
    <Grid
      container
      justifySelf="center"
      justifyContent="center"
      justifyItems="center"
    >
      <Grid item xs={labelSize} className="self-center">
        {displayName}
      </Grid>
      <Grid item xs={inputSize}>
        <RHFListInput
          {...dropdownProps}
          {...dynamicProps(props)}
          onChange={(e: any) => onChange(e, props)}
          value={value}
          sx={{
            "&.MuiInputBase-root .MuiInputBase-input": {
              padding: "6px 8px",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default HeaderWithDropdown;
