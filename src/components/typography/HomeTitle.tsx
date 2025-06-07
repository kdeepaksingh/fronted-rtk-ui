import React from "react";
import Translate from "./Translate";

interface HomeTitleProps {
  text?: string;
  subtitle?: string;
}

const HomeTitle: React.FC<HomeTitleProps> = ({ text, subtitle }) => {
  if (!text) {
    return null;
  }

  return (
    <div>
      <Translate dataKey={text} className="font-light text-2xl sm:font-4" />
      {subtitle && (
        <Translate
          dataKey={subtitle}
          className="text-3xl sm:font-46 font-bold ml-2"
        />
      )}
    </div>
  );
};

export default HomeTitle;
