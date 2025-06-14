/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import type { FC, MouseEvent } from "react";
import type { MenuProps } from "@mui/material/Menu";
import type { MenuItemProps } from "@mui/material/MenuItem";
import ConfirmHoc from "../hoc/ConfirmHoc";
import Icon from "../icon/Icon";
import Translate from "../typography/Translate";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 12,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    "& .MuiList-root": {
      padding: 0,
    },
  },
}));

const ConfirmedMenuItem = ConfirmHoc(MenuItem);

interface ActionProps extends Omit<MenuItemProps, "onClick"> {
  icon?: string;
  tooltip?: string;
  title?: string;
  ButtonName?: string;
  show?: boolean;
  onClick: (row?: any) => void;
  onClose?: (row?: any) => void;
  render?: (params: {
    row: any;
    ActionButton: FC<any>;
    key: string;
  }) => React.ReactNode;
}

interface DataTableActionsProps {
  actions: ActionProps[];
  row?: any;
}

const DataTableActions: FC<DataTableActionsProps> = ({ actions, row }) => {
  const [ID] = React.useState(() => Math.random().toString().slice(2));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ButtonID = `${ID}-drop-button`;
  const MenuID = `${ID}-drop-menu`;

  return (
    <div className="relative">
      <Button
        id={ButtonID}
        aria-controls={open ? MenuID : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        size="small"
        className="!py-1"
        tabIndex={0}
      >
        <MoreVert />
      </Button>
      <StyledMenu
        id={MenuID}
        MenuListProps={{ "aria-labelledby": ButtonID }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {actions.map((props, index) => {
          const {
            icon,
            tooltip,
            title,
            ButtonName,
            render,
            show = true,
            ...rest
          } = props;

          const ActionButton: FC<any> = (otherProps) =>
            !show ? null : (
              <ConfirmedMenuItem
                disableRipple
                row={row}
                key={index}
                {...rest}
                {...otherProps}
                onClick={() => {
                  handleClose();
                  props.onClick(row);
                }}
                onClose={() => {
                  handleClose();
                }}
              >
                <div className="m-w-[28px] inline-block text-center mr-2 -ml-1">
                  <Icon name={icon} />
                </div>
                <Translate dataKey={ButtonName || title || tooltip} />
              </ConfirmedMenuItem>
            );

          return render ? (
            render({ row, ActionButton, key: `${index}-${ButtonName}` })
          ) : (
            <ActionButton key={`${index}-${ButtonName}`} />
          );
        })}
      </StyledMenu>
    </div>
  );
};

export default DataTableActions;
