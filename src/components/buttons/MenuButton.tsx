import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import type { ElementType } from "react";
import { ClickAwayListener, Popper } from "@mui/material";
import type { PopperProps } from "@mui/material";
import { ArrayUtils } from "../../utils/ArrayUtils";
import Condition from "../commons/Condition";

type MenuButtonProps = {
  action?: ReactNode;
  children: ReactNode;
  placement?: PopperProps["placement"];
  disabled?: boolean;
  WrapperComponent?: ElementType | false;
  forcedOpen?: boolean;
  isLast?: boolean;
  onClose?: (open: boolean) => void;
  onOpen?: (open: boolean) => void;
  open?: boolean;
  openMode?: "hover" | "click";
  footer?: (args: { setMenuOpen: (open: boolean) => void }) => ReactNode;
  className?: string;
  alignItems?: string;
  popoverProps?: Partial<PopperProps>;
};

export const MenuButton: React.FC<MenuButtonProps> = ({
  action = null,
  children,
  placement = "bottom",
  disabled = false,
  WrapperComponent = false,
  forcedOpen = false,
  isLast = false,
  onClose = () => {},
  onOpen = () => {},
  open = false,
  openMode = "hover",
  footer = () => null,
  className = "",
  alignItems = "items-center",
  popoverProps = {},
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(open);
  const reference = useRef<HTMLDivElement | null>(null);

  const commonProps: Record<string, any> = {
    ...ArrayUtils.addWhen(
      {
        onMouseOver: () => !menuOpen && !disabled && setMenuOpen(true),
        onMouseLeave: () => !disabled && setMenuOpen(false),
      },
      openMode === "hover",
      false
    ),
    ref: reference,
  };

  useEffect(() => {
    setMenuOpen(open);
  }, [open]);

  useEffect(() => {
    if (menuOpen) {
      onOpen(menuOpen);
    } else {
      onClose(menuOpen);
    }
  }, [menuOpen, onOpen, onClose]);

  const items = (
    <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
      <span>
        <Condition show={openMode === "hover"}>{action}</Condition>
        <Condition show={openMode !== "hover"}>
          <span
            onClick={() => {
              if (!disabled) {
                setMenuOpen((prev) => !prev);
              }
            }}
          >
            {action}
          </span>
        </Condition>

        <Popper
          anchorEl={reference.current}
          open={menuOpen || forcedOpen}
          className="bg-white shadow-sm border !rounded z-[10000]"
          placement={placement}
          {...popoverProps}
        >
          {children}
          {footer({ setMenuOpen })}
        </Popper>
      </span>
    </ClickAwayListener>
  );

  return WrapperComponent ? (
    <WrapperComponent {...commonProps}>{items}</WrapperComponent>
  ) : (
    <div
      className={`flex ${alignItems} justify-end cursor-pointer ${
        isLast ? "pr-0" : ""
      } ${className}`}
      {...commonProps}
    >
      {items}
    </div>
  );
};

export default MenuButton;
