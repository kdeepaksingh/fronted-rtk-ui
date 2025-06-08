import React from "react";
import type { ReactNode } from "react";
import { ConfirmDialogue } from "./ConfirmDialogue";
import { DUM_FUCTION } from "../constants";

type ConfirmOrCancelProps = {
  open?: boolean;
  onCancel?: () => void;
  onContinue?: () => void;
  children: ReactNode;
  continueText?: string;
  cancelText?: string;
};

export const ConfirmOrCancel: React.FC<ConfirmOrCancelProps> = ({
  open = false,
  onCancel = DUM_FUCTION,
  onContinue = DUM_FUCTION,
  children,
  continueText = "Continue",
  cancelText = "Cancel",
}) => (
  <ConfirmDialogue
    open={Boolean(open)}
    title="Typo.confirmAction"
    actions={[
      {
        ButtonName: cancelText,
        onClick: onCancel,
        variant: "outlined",
        type: "error",
        size: "small",
        label: "",
      },
      {
        ButtonName: continueText,
        onClick: onContinue,
        variant: "contained",
        type: "primary",
        size: "small",
        label: "",
      },
    ]}
  >
    {children}
  </ConfirmDialogue>
);

export default ConfirmOrCancel;
