import React from "react";
import Translate from "./Translate";
import colors from "../../color";

interface HomeTitleProps {
  text?: string;
  subtitle?: string;
  color?: string;
  weight?: React.CSSProperties["fontWeight"];
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const HomeTitle: React.FC<HomeTitleProps> = ({
  text,
  subtitle,
  color = colors["ui-orange"],
  weight = "bold",
  icon,
  style = {},
}) => {
  if (!text) {
    return null;
  }

  return (
    <div className="text-center">
      <div className="flex justify-center items-center gap-2">
        <span className="mt-1"> {icon}</span>
        <Translate
          dataKey={text}
          className="text-[1.6rem] font-sans"
          style={{
            fontWeight: weight,
            color,
            ...style,
          }}
        />
      </div>
      {subtitle && (
        <Translate
          dataKey={subtitle}
          className="text-sm sm:font-46 font-bold mt-2 block text-gray-700"
        />
      )}
    </div>
  );
};

export default HomeTitle;
