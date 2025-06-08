/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import type { ReactNode } from "react";
import type { MouseEvent } from "react";
import { Popover } from "@mui/material";
import MainButton from "../buttons/MainButton";

type PopperProps = {
  lable?: string;
  children: ReactNode;
  icon?: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  className?: string;
  iconOnly?: boolean;
};

export const Popper: React.FC<PopperProps> = ({
  lable = "",
  children,
  icon = "",
  color = "error",
  className = "",
  iconOnly = false,
}) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (_event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : arrowRef.current);
  };

  const open = Boolean(anchorEl);
  const id = open ? "data-popper" : undefined;

  return (
    <div className="!inline-block" ref={arrowRef}>
      <MainButton
        color={color}
        className={`${className} !capitalize`}
        variant="outlined"
        icon={icon}
        disableElevation
        size="small"
        onClick={handleClick}
        ButtonName={lable}
        iconOnly={iconOnly}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClick}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          className: "!mt-2",
        }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default Popper;
