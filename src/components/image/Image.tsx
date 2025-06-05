import StringUtils from "../../utils/StringUtils";
import AsyncImage from "./AsyncImage";

type ImageProps = {
  src?: string;
  alt?: string;
  defaultSrc?: string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
  [key: string]: any;
};

const Image = ({
  src = "",
  alt,
  defaultSrc = "",
  height,
  width,
  style,
  ...props
}: ImageProps) => {
  const alternateText = (!alt && StringUtils.getImageName(src)) || alt;

return (
    <AsyncImage
        src={src}
        alt={alternateText || ""}
        height={height}
        width={width}
        style={style}
        onError={(error: React.SyntheticEvent<HTMLImageElement, Event>) => {
            if (defaultSrc) {
                (error.currentTarget as HTMLImageElement).src = defaultSrc;
            }
        }}
        {...props}
    />
);
};

export default Image;
