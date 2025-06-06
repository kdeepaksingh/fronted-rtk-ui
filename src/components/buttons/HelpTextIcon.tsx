import { Tooltip } from "@mui/material";
import { t } from "i18next";

interface HelpTextIconProps {
  tooltip: string;
  icon?: React.ReactNode;
}

export const HelpTextIcon = ({ tooltip }: HelpTextIconProps) => {
  return (
    <Tooltip title={t(tooltip)} placement="top" arrow>
      <span className="inline-flex justify-center items-center h-6 w-6 rounded-full bg-upag-primary-light-contrast cursor-pointer">
        ?
      </span>
    </Tooltip>
  );
};

export default HelpTextIcon;
