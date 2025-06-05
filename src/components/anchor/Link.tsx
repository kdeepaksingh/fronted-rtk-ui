import { useNavigate } from "react-router-dom";
import Translate from "../typography/Translate";
import { Css } from "../constants/Css";

type LinkColor =
  | "black"
  | "primary"
  | "secondary"
  | "danger"
  | keyof typeof Css.LinkColors;

interface LinkProps {
  text?: string;
  url?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  color?: LinkColor;
  childBefor?: boolean;
  className?: string;
}

const Link = ({
  text = "",
  url = "",
  onClick,
  children,
  color = "black",
  childBefor = false,
  className = "",
}: LinkProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      navigate(url);
    }
  };

  const textColorClass = (() => {
    switch (color) {
      case "black":
        return "text-black";
      case "primary":
        return "text-blue-600";
      case "secondary":
        return "text-gray-600";
      case "danger":
        return "text-red-600";
      default:
        return "";
    }
  })();

  return (
    <span
      onClick={handleClick}
      className={`
        font-semibold 
        underline-dotted 
        cursor-pointer 
        text-[0.8rem] 
        ${textColorClass} 
        ${className}
      `}
    >
      {childBefor && children}
      <Translate dataKey={text} />
      {!childBefor && children}
    </span>
  );
};

export default Link;
