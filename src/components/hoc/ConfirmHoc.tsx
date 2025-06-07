import { useState } from "react";
import Modal from "../modal/CustomModal";
import type { FC, ComponentType } from "react";

interface ConfirmAction {
  label: string;
  color?: string;
  variant?: string;
  onClick?: (row?: any) => void;
}

interface ConfirmProps {
  title?: string;
  content?: React.ReactNode | ((row?: any) => React.ReactNode);
  maxWidth?: string;
  actions?: ConfirmAction[] | ((row?: any) => ConfirmAction[]);
}

interface ConfirmHocOptions {
  actionType?: "button" | "confirm";
  confirm?: ConfirmProps;
  onClick?: () => void;
  onOpen?: () => void;
  onClose?: (row?: any) => void;
  row?: any;
  [key: string]: any; // For passing additional props
}

export function ConfirmHoc<P extends object>(
  WrappedComponent: ComponentType<P & { onClick: () => void }>,
  {
    actionType = "button",
    confirm = {},
    onClick = () => {},
    onOpen = () => {},
    onClose = () => {},
    row = {},
    ...rest
  }: ConfirmHocOptions
): FC<Omit<P, "onClick">> {
  return function WithConfirm(props: Omit<P, "onClick">) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      switch (actionType) {
        case "confirm":
          onOpen?.();
          setOpen(true);
          break;
        default:
          onClick?.();
          break;
      }
    };

    const actions =
      (Array.isArray(confirm.actions)
        ? confirm.actions
        : confirm.actions?.(row)) || [];

    return (
      <>
        <WrappedComponent {...(props as P)} {...rest} onClick={handleClick} />
        {actionType === "confirm" && (
          <Modal
            maxWidth={confirm.maxWidth || "xs"}
            title={confirm.title}
            height="h-auto"
            actions={actions.map((action) => ({
              ...action,
              onClick: () => {
                setOpen(false);
                if (action.onClick) {
                  action.onClick(row);
                } else {
                  onClose?.(row);
                }
              },
            }))}
            open={open}
            onClose={() => {
              onClose?.();
              setOpen(false);
            }}
          >
            {typeof confirm.content === "function"
              ? confirm.content(row)
              : confirm.content}
          </Modal>
        )}
      </>
    );
  };
}

export default ConfirmHoc;
