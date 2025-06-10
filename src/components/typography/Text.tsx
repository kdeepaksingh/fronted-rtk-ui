import colors from "../../color";
import Icon from "../icon/Icon";
import Translate from "./Translate";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  size?: number;
  search?: string;
  icon?: string;
}

export const Text: React.FC<TextProps> = ({ text = "", size = 24, search = "", icon, ...props }) => {
  if (!text) return null;

  return (
    <div
      style={{
        fontSize: `${parseFloat(size.toString()) / 16}rem`,
        color: colors["ui-blue"],
        ...props.style,
      }}
      {...props}
    >
      {icon && <Icon name={icon} style={{fontSize:"23px"}} />}
      <Translate dataKey={text} search={search} />
    </div>
  );
};

export default Text;
