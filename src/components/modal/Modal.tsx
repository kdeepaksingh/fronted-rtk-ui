import React from "react";
import type { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import type { DialogTitleProps } from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ButtonGroup from "../buttons/ButtonGroup";
import RHFTextInput from "../inputs/RHFTextInput";
import Condition from "../commons/Condition";
import Icon from "../icon/Icon";
import PageTitle from "../typography/PageTitle";

// Type for action buttons
type ActionButton = {
  label: string;
  onClick: () => void;
  color?: string;
  variant?: "text" | "outlined" | "contained";
  [key: string]: any;
};

type ModalTitleProps = DialogTitleProps & {
  onClose?: () => void;
  onBack?: () => void;
  currentStep?: string;
  icon?: string;
  title?: string;
  titleClassName?: string;
  titleChildren?: ReactNode;
  color?: string;
};

const ModalTitle: React.FC<ModalTitleProps> = ({
  onClose,
  onBack,
  currentStep = "",
  icon = "",
  title = "",
  titleClassName = "",
  titleChildren = null,
  color = "primary",
  ...rest
}) => (
  <DialogTitle
    {...rest}
    className={`capitalize ${
      title && "borderleft-style"
    } !px-8 !py-4 !shadow-inner ${titleClassName} ${color}`}
  >
    <Grid container alignItems="center">
      <Grid item xs={10} className="relative">
        <PageTitle
          text={title}
          className="!mb-0 !text-base"
          onBack={onBack}
          weight={600}
          icon={icon}
          color={color}
        />
        {titleChildren}
      </Grid>
      <Grid item xs={2} className="text-right absolute right-1.5 top-1.5">
        {onClose && (
          <IconButton onClick={onClose}>
            <Icon name="CloseIcon" />
          </IconButton>
        )}
      </Grid>
    </Grid>
  </DialogTitle>
);

// Props for the main Modal component
type ModalProps = {
  title?: string;
  children: ReactNode;
  open?: boolean;
  actions?: ActionButton[];
  onClose?: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  onBack?: () => void;
  steps?: string;
  currentStep?: number;
  height?: string;
  btnClass?: string;
  disableEscapeKeyDown?: boolean;
  search?: boolean;
  searchPlaceholder?: string;
  onChangeSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm?: string;
  bodyClassName?: string;
  parentClass?: string;
  icon?: string;
  scroll?: "body" | "paper";
  keepMounted?: boolean;
  bodyPaddingClassName?: string;
  titleClassName?: string;
  onDontShow?: (checked: boolean) => void;
  color?: string;
};

export const Modal: React.FC<ModalProps> = ({
  title = "",
  children,
  open = false,
  actions = [],
  onClose,
  maxWidth = "sm",
  fullWidth = true,
  onBack,
  steps = "",
  currentStep = 1,
  height = "h-80",
  btnClass = "!justify-start",
  disableEscapeKeyDown = false,
  search = false,
  searchPlaceholder = "",
  onChangeSearch = () => {},
  searchTerm = "",
  bodyClassName = "",
  parentClass = "",
  icon = "",
  scroll = "body",
  keepMounted = false,
  bodyPaddingClassName = "!px-8 !py-2",
  titleClassName = "",
  onDontShow,
  color = "primary",
}) => {
  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      disableEscapeKeyDown={disableEscapeKeyDown}
      scroll={scroll}
      keepMounted={keepMounted}
      TransitionComponent={Slide}
      className={parentClass}
    >
      <Condition show={Boolean(title) || Boolean(onClose)}>
        <ModalTitle
          onClose={onClose}
          onBack={onBack}
          steps={steps}
          currentStep={String(currentStep)}
          icon={icon}
          title={title}
          titleClassName={titleClassName}
          color={color}
        />
      </Condition>

      <Condition show={search}>
        <div className="px-6 -mt-4 bg-white z-10">
          <RHFTextInput
            placeholder={searchPlaceholder}
            onChange={onChangeSearch}
            value={searchTerm}
          />
        </div>
      </Condition>

      <DialogContent
        className={`${bodyClassName} ${bodyPaddingClassName} overflow-auto ${height} text-sm`}
      >
        {children}
      </DialogContent>

      {actions?.length > 0 && (
        <DialogActions
          className={`!px-8 !py-4 justify-end ${btnClass} !text-upag-black-01 !uppercase !font-semibold shadow-inner`}
        >
          <Condition show={Boolean(onDontShow)}>
            <div className="grow">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    className="!p-0"
                    onChange={(e) => onDontShow?.(e.target.checked)}
                  />
                }
                label={
                  <span className="text-xs leading-tight text-black capitalize pl-1">
                    Don't show this message until the next login?
                  </span>
                }
              />
            </div>
          </Condition>
          <ButtonGroup actions={actions} />
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import Condition from "../commons/Condition";
// import CommonTitle from "../typography/CommonTitle";
// import Icon from "../icon/Icon";
// import colors from "../../color";
// import ButtonGroup from "../buttons/ButtonGroup";

// interface ModalTitleProps {
//   onClose?: (() => void) | false;
//   onBack?: (() => void) | false;
//   currentStep?: string;
//   icon?: string;
//   title: string;
//   titleClassName?: string;
//   titleChildren?: React.ReactNode;
//   color?: string;
//   borderLeft?: string;
//   [key: string]: any;
// }

// const ModalTitle = ({
//   onClose = false,
//   onBack = false,
//   currentStep = "",
//   icon = "",
//   title,
//   titleClassName = "",
//   titleChildren = null,
//   color = colors["ui-orange"],
//   borderLeft,
//   ...rest
// }: ModalTitleProps) => (
//   <DialogTitle
//     {...rest}
//     className={`capitalize px-5 py-[10px] shadow-inner ${
//       title ? "border-l-[5px] border-[#882D00]" : ""
//     }`}
//   >
//     <div className="flex items-center w-full">
//       <div className="relative flex-1">
//         <CommonTitle
//           text={title}
//           className="!mb-0 !text-base"
//           onBack={typeof onBack === "function" ? onBack : undefined}
//           weight={600}
//           icon={icon}
//           color={color}
//         />
//         {titleChildren}
//       </div>
//       <div className="absolute right-3 top-3 text-right w-12">
//         {onClose ? (
//           <IconButton onClick={onClose}>
//             <Icon name={"Close"} />
//           </IconButton>
//         ) : null}
//       </div>
//     </div>
//   </DialogTitle>
// );

// import React from "react";

// interface ModalProps {
//   title?: string;
//   children?: React.ReactNode;
//   open?: boolean;
//   actions?: any[];
//   onClose?: (() => void) | false;
//   maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl";
//   fullWidth?: boolean;
//   onBack?: (() => void) | false;
//   steps?: string;
//   currentStep?: number;
//   height?: string;
//   width?: string;
//   btnClass?: string;
//   disableEscapeKeyDown?: boolean;
//   search?: boolean;
//   bodyClassName?: string;
//   parentClass?: string;
//   icon?: string;
//   scroll?: "body" | "paper";
//   keepMounted?: boolean;
//   titleClassName?: string;
//   color?: string;
// }

// export const Modal = ({
//   title = "",
//   children,
//   open = false,
//   actions = [],
//   onClose = false,
//   maxWidth = "sm",
//   fullWidth = true,
//   onBack = false,
//   steps = "",
//   currentStep = 1,
//   height = "h-[320px]",
//   width = "",
//   btnClass = "flex-start",
//   disableEscapeKeyDown = false,
//   search = false,
//   bodyClassName = "",
//   parentClass = "",
//   icon = "",
//   scroll = "body",
//   keepMounted = false,
//   titleClassName = "",
//   color = colors["ui-orange"],
// }: ModalProps) => {
//   return (
//     <Dialog
//       open={open}
//       maxWidth={maxWidth}
//       fullWidth={fullWidth}
//       disableEscapeKeyDown={disableEscapeKeyDown}
//       scroll={scroll}
//       keepMounted={keepMounted}
//       className={parentClass}
//       sx={width ? { width: width } : {}}
//     >
//       <Condition show={Boolean(title) || Boolean(onClose)}>
//         <ModalTitle
//           onClose={onClose}
//           onBack={onBack}
//           steps={steps}
//           currentStep={String(currentStep)}
//           icon={icon}
//           title={title}
//           titleClassName={titleClassName}
//           color={color}
//         />
//       </Condition>

//       <Condition show={search}>
//         <div className="pl-6 pr-6 -mt-4 bg-white z-10">
//           {/* search input component */}
//         </div>
//       </Condition>

//       <DialogContent
//         className={`overflow-auto text-base px-8 py-4 ${height} ${bodyClassName}`}
//       >
//         {children}
//       </DialogContent>

//       {actions?.length > 0 && (
//         <DialogActions
//           className={`px-8 py-[10px] shadow-inner font-semibold uppercase text-black ${
//             btnClass === "flex-start" ? "justify-start" : "justify-end"
//           }`}
//         >
//           <ButtonGroup actions={actions} />
//         </DialogActions>
//       )}
//     </Dialog>
//   );
// };

// export default Modal;
