import type { ReactNode } from "react";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import ButtonGroup from "../buttons/ButtonGroup";
import colors from "../../color";
import Translate from "../typography/Translate";
import Icon from "../icon/Icon";

// Type for each action item passed to ButtonGroup
type ActionButton = {
  ButtonName: string;
  onClick: () => void;
  variant?: "outlined" | "contained" | "text";
  type?: string;
  size?: "small" | "medium" | "large";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type LightModalProps = {
  title?: string;
  children: ReactNode;
  open?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  actions?: ActionButton[];
  onClose?: () => void;
  disableMinHeight?: boolean;
  keepMounted?: boolean;
  border?: string;
  className?: string;
  theme?: string;
};

export const LightModal: React.FC<LightModalProps> = ({
  title = "",
  children,
  open = false,
  maxWidth = "sm",
  fullWidth = true,
  actions = [],
  onClose,
  disableMinHeight,
  keepMounted = false,
  border = "!border-b",
  className = "",
  theme = "",
}) => {
  return (
    <Dialog
      open={open}
      className={`light-blue-theme ${className} ${theme}`}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      scroll="body"
      keepMounted={keepMounted}
      TransitionComponent={Slide as React.FC<TransitionProps>}
    >
      <DialogTitle sx={{ m: 0, px: 0, py: 0 }} className={border}>
        <Translate
          dataKey={title}
          className="text-base font-semibold capitalize"
        />
      </DialogTitle>

      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 4,
            color: colors["ui-brown-light"],
          }}
        >
          <Icon
            name="CloseIconBlue"
            className="!text-ui-brown-light-contrast"
          />
        </IconButton>
      )}

      <DialogContent className="overflow-auto !rounded-[10px] mt-4 mb-2 !p-0">
        <div className={disableMinHeight ? "" : "min-h-[340px]"}>
          {children}
        </div>
      </DialogContent>

      {actions?.length > 0 && (
        <DialogActions className="!p-0 justify-end !text-ui-black !uppercase !font-semibold !mr-1">
          <ButtonGroup actions={actions} />
        </DialogActions>
      )}
    </Dialog>
  );
};

export default LightModal;
