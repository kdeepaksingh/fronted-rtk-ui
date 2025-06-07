import React from "react";
import Translate from "./Translate";

interface TabTitleProps {
  dataKey: string;
  params?: Record<string, unknown>;
  className?: string;
}

export const TabTitle: React.FC<TabTitleProps> = ({
  dataKey,
  params = {},
  className = "",
}) => (
  <Translate
    dataKey={dataKey}
    params={params}
    htmlContent
    className={`!text-base ${className}`}
  />
);
