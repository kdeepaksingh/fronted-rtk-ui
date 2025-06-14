import { Grid } from "@mui/material";
import { CustomTooltip } from "../tooltip/CustomToolTip";
import { Info } from "@mui/icons-material";
import React from "react";

interface HeaderComponentParams {
  tooltip?: string;
  placement?: "top" | "bottom" | "left" | "right";
  labelSize?: number;
}

interface Column {
  colDef?: {
    headerComponentParams?: HeaderComponentParams;
  };
}

interface HeaderToolTipProps {
  displayName: string;
  column?: Column;
}

export const HeaderToolTip: React.FC<HeaderToolTipProps> = ({
  displayName,
  column = {},
}) => {
  const {
    tooltip = "",
    placement = "bottom",
    labelSize = 6,
  } = column.colDef?.headerComponentParams || {};

  return (
    <Grid
      container
      justifySelf="center"
      justifyContent="center"
      justifyItems="center"
    >
      <Grid item xs={labelSize} className="self-center flex">
        {displayName}
        <CustomTooltip
          placement={placement}
          arrow
          maxWidth="auto"
          zIndex={1000}
          title={tooltip}
        >
          <div className="flex ml-1 items-center">
            <Info fontSize="inherit" />
          </div>
        </CustomTooltip>
      </Grid>
    </Grid>
  );
};

export default HeaderToolTip;
