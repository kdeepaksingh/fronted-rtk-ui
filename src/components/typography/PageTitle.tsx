import { IconButton, Badge } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Translate from "./Translate";
import React from "react";
import Condition from "../commons/Condition";
import Icon from "../icon/Icon";
import colors from "../../color";

const colorTypes: Record<string, string> = {
  primary: colors["ui-blue"],
  error: colors["ui-red-light"],
};

interface PageTitleProps {
  text: string;
  textParams?: Record<string, string | number>;
  size?: number;
  weight?: string | number;
  className?: string;
  badge?: string;
  onBack?: (() => void) | boolean;
  translate?: boolean;
  titleType?: string;
  icon?: string;
  color?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  text,
  textParams = {},
  size = 18,
  weight = "bold",
  className = "",
  badge = "",
  onBack = false,
  translate = true,
  titleType = "",
  icon = "",
  color = colors['ui-brown-dark'],
}) => {
  if (!text) return null;

  return (
    <div className="flex items-center">
      <Condition show={onBack !== false}>
        <div className="mr-2 -ml-2 pr-3">
          <IconButton
            size="small"
            onClick={typeof onBack === "function" ? onBack : undefined}
            title="Go Back"
          >
            <ArrowBackIosNewIcon fontSize="small" className="rotate-180" />
          </IconButton>
        </div>
      </Condition>

      <div
        className={`relative ${className} font-upag-open-sans flex items-center ${
          colorTypes[color] || color
        } max-[767px]:mb-4 ${
          titleType === "page" ? "heading-bg min-w-full md:min-w-[183px]" : ""
        }`}
        style={{ fontSize: size, fontWeight: weight }}
      >
        <Condition show={!!icon}>
          <div className="mr-2">
            <Icon name={icon} width={35} height={36} />
          </div>
        </Condition>

        <Badge
          badgeContent={badge || null}
          color="primary"
          className={`pl-2 ${
            titleType === "page" ? "text-xs font-normal" : ""
          }`}
        >
          <Translate
            dataKey={text}
            translate={translate}
            params={textParams}
            htmlContent
          />
        </Badge>

        <div
          className="absolute left-0 h-1 highlighter"
          style={{ width: size * 2 }}
        ></div>
      </div>
    </div>
  );
};

export default PageTitle;
