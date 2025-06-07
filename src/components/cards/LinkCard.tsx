import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import colors from "../../color";
import Icon from "../icon/Icon";
import Translate from "../typography/Translate";

interface LinkCardProps {
  icon?: string;
  text?: string;
  url?: string;
  onClick?: () => void;
}

export const LinkCard = ({
  icon = "",
  text = "",
  url = "",
  onClick,
}: LinkCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      navigate(url);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{ background: colors["ui-sea-light"] || "" }}
      className="h-full items-start"
    >
      <CardActionArea onClick={handleClick} className="h-full">
        <CardContent sx={{ p: 2 }} className="h-full">
          <div className="mb-3">
            <Icon
              name={icon}
              className="rounded"
              style={{ background: colors["ui-brown-light"] || "" }}
            />
          </div>
          <div className="break-words">
            <Typography variant="h6" className="!text-base">
              <Translate dataKey={text} />
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LinkCard;

{
  /* <LinkCard icon="Dashboard" text="Label.GoToDashboard" url="/dashboard" /> */
}
