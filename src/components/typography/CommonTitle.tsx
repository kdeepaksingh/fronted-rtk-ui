import { IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Translate from "./Translate";
import Icon from "../icon/Icon";
import colors from "../../color";

interface CommonTitleProps {
  text: string;
  className?: string;
  onBack?: () => void;
  weight?: React.CSSProperties["fontWeight"];
  icon?: string;
  color?: string;
  style?: React.CSSProperties;
}

const CommonTitle = ({
  text,
  className = "",
  onBack,
  weight = "bold",
  icon,
  color = colors["ui-orange"],
  style = {},
}: CommonTitleProps) => {
  if (!text) return null;

  return (
    <Box className={`flex gap-6 w-full ${className}`}>
      {onBack && (
        <IconButton onClick={onBack} size="small">
          <ArrowBackIcon />
        </IconButton>
      )}

      {icon && <Icon name={icon} />}

      <Translate
        dataKey={text}
        className={`text-[1.8rem] font-sans text-center`}
        style={{
          fontWeight: weight,
          color,
          ...style,
        }}
      />
    </Box>
  );
};

export default CommonTitle;
