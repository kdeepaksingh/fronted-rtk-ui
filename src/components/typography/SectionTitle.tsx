import React from "react";
import Translate from "./Translate";

interface SectionTitleProps {
  text?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  text = "",
  className = "pb-4",
}) => {
  if (!text) return null;

  return (
    <div className={className}>
      <Translate
        dataKey={text}
        className="font-ui-open-sans font-bold !text-2xl sm:text-2xl title-bg text-upag-primary w-full lg:min-w-[263px] lg:w-auto"
      />
    </div>
  );
};

export default SectionTitle;
