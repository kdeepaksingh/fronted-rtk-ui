/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip, tooltipClasses } from "@mui/material";
import type { TooltipProps } from "@mui/material";
import styled from "@emotion/styled";
import colors from "../../color";
import type { FC } from "react";

interface CustomTooltipProps extends TooltipProps {
  maxWidth?: number;
  backgroundColor?: string;
  zIndex?: number;
}

// This component is passed to `styled` to apply custom styles
const CustomTooltipComponent: FC<CustomTooltipProps> = ({
  className,
  maxWidth,
  backgroundColor,
  zIndex,
  ...props
}) => <Tooltip {...props} classes={{ popper: className }} />;

export const CustomTooltip = styled(CustomTooltipComponent)(
  ({
    theme,
    backgroundColor = colors["ui-primary"],
    color = "white",
    maxWidth = 220,
    zIndex = 2000,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theme: any;
    backgroundColor?: string;
    color?: string;
    maxWidth?: number;
    zIndex?: number;
  }) => ({
    zIndex: `${zIndex} !important`,
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor,
      color,
      maxWidth,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      padding: 8,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: backgroundColor,
    },
  })
);
