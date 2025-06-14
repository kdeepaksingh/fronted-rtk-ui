/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import Condition from "../commons/Condition";
import Icon from "../icon/Icon";

interface MainButtonProps extends Omit<ButtonProps, "color"> {
  ButtonName?: string;
  translateParams?: Record<string, any>;
  disabled?: boolean;
  icon?: any;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  buttonColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant?: "text" | "outlined" | "contained";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  url?: string;
  show?: boolean;
  tooltip?: string;
  loading?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  iconOnly?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  sx?: object;
}

const MainButton: React.FC<MainButtonProps> = ({
  ButtonName = "",
  translateParams = {},
  disabled = false,
  icon = "",
  children,
  type = "button",
  buttonColor = "primary",
  variant = "contained",
  onClick = () => {},
  url,
  show = true,
  tooltip = "",
  loading = false,
  placement = "top",
  iconOnly = false,
  size,
  className,
  sx,
  ...props
}) => {
  const navigate = useNavigate();

  const text = ButtonName
    ? t(
        ButtonName,
        translateParams?.params ? translateParams.params : translateParams
      )
    : "";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (url) {
      navigate(url);
    }
    onClick?.(e);
  };

  return (
    <Condition show={show}>
      <Tooltip
        title={
          (tooltip && String(t(tooltip))) ||
          (iconOnly && typeof text === "string" ? text : "") ||
          ""
        }
        placement={placement}
        arrow
      >
        <span className={`${(props as any).fullWidth ? "w-full h-full" : ""}`}>
          <Button
            type={type}
            disabled={disabled || loading}
            variant={iconOnly ? "text" : variant}
            color={buttonColor}
            aria-label={typeof text === "string" ? text : ""}
            size={size}
            onClick={handleClick}
            disableElevation
            tabIndex={0}
            sx={{
              fontSize: "12px",
              ...sx,
            }}
            className={className}
            {...props}
          >
            {loading && (
              <CircularProgress size={14} color="inherit" className="mr-2" />
            )}
            {icon && !loading && <Icon name={icon} />}
            {!iconOnly && text && typeof text === "string" && (
              <span className={`${icon ? "ml-2" : ""}`}>{text}</span>
            )}
            {children}
          </Button>
        </span>
      </Tooltip>
    </Condition>
  );
};

export default MainButton;
