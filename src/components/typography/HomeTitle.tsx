import React from "react";
import Translate from "./Translate";
import colors from "../../color";

interface HomeTitleProps {
  text?: string;
  subtitle?: string;
  color?: string;
  weight?: React.CSSProperties["fontWeight"];
  icon?: string;
  style?: React.CSSProperties;
}

const HomeTitle: React.FC<HomeTitleProps> = ({
  text,
  subtitle,
  color = colors["ui-orange"],
  weight = "bold",
  style = {},
}) => {
  if (!text) {
    return null;
  }

  return (
    <div>
      <Translate
        dataKey={text}
        className={`text-[1.6rem] font-sans text-center`}
        style={{
          fontWeight: weight,
          color,
          ...style,
        }}
      />
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
