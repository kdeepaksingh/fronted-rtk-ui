import React from "react";
import type { ReactNode } from "react";
import Modal from "./Modal";

type ActionButton = {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  variant?: "text" | "outlined" | "contained";
  [key: string]: unknown;
};

type ConfirmDialogueProps = {
  open?: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  actions?: ActionButton[];
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  onDontShow?: () => void;
};

export const ConfirmDialogue: React.FC<ConfirmDialogueProps> = ({
  open = false,
  onClose,
  children,
  title = "Verify Request",
  actions = [],
  maxWidth = "xs",
  onDontShow,
}) => {
  return (
    <Modal
      open={open}
      height="!h-auto"
      title={title}
      maxWidth={maxWidth}
      scroll="body"
      titleClassName="!shadow-none !border-b"
      onClose={onClose}
      actions={actions}
      btnClass="!justify-end"
      onDontShow={onDontShow}
    >
      {children}
    </Modal>
  );
};

export default ConfirmDialogue;
