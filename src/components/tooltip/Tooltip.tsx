import { Tooltip as CustomTooltip } from "@mui/material";
import colors from "../../color";

import React from "react";

interface TooltipProps {
  title?: React.ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ title = "--", position = "left", children }) => {
  return (
    <CustomTooltip
      title={title}
      placement={position}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: colors["ui-gray"],
            "& .MuiTooltip-arrow": {
              color: colors["ui-black"],
            },
          },
        },
      }}
    >
      {children}
    </CustomTooltip>
  );
};

export default Tooltip;
