/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as MuiIcons from "@mui/icons-material";
import EmpMngIcon from "../../assets/png/EmpIcon.png";
import UserIcon from "../../assets/svg/user.svg";
import RefreshIcon from "../../assets/svg/refresh.svg";
import registerBg from "../../assets/svg/register-bg.svg";
import statusIcon from "../../assets/svg/ComplaintStatus.svg";
import Screenreader from "../../assets/png/screenreader.png";

const Icons: Record<string, any> = {
  EmpMngIcon,
  Screenreader,
  UserIcon,
  RefreshIcon,
  registerBg,
  statusIcon,
  ...MuiIcons,
};

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: any;
  defaultIcon?: string;
}

const Icon: React.FC<IconProps> = ({ name, defaultIcon = null, ...props }) => {
  const IconComponent = Icons[name] || (defaultIcon && Icons[defaultIcon]);

  if (!IconComponent) {
    console.warn(`Icon '${name}' not found in Icons object.`);
    return null;
  }

  // If it's a valid React component (MUI SVG Icon)
  if (
    typeof IconComponent === "function" ||
    (typeof IconComponent === "object" && "$$typeof" in IconComponent)
  ) {
    const Component = IconComponent as React.ElementType;
    return <Component {...props} />;
  }

  // If it's a string (e.g., imported image path)
  if (typeof IconComponent === "string") {
    return (
      <img
        src={IconComponent}
        alt={name}
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  return null;
};

export default Icon;
