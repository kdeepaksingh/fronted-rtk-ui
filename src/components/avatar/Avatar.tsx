import { Avatar as UIAvatar } from "@mui/material";
import upperFirst from "lodash/upperFirst";
import Icon from "../icon/Icon";

const Avatar = ({
  icon,
  width = 40,
  height = 40,
  className = "",
}: {
  icon: string;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <UIAvatar
    className={className}
    sx={{ width: `${width}px`, height: `${height}px` }}
  >
    <Icon
      name={upperFirst(String(icon)).replace(new RegExp(" ", "g"), "")}
      defaultIcon={"India"}
      //   width={width}
      //   height={height}
    />
  </UIAvatar>
);

export default Avatar;
