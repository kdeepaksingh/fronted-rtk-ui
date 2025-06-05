import { LazyLoadImage } from "react-lazy-load-image-component";

type AsyncImageProps = {
  src: string;
  alt: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
};

const AsyncImage = ({
  src,
  alt,
  height,
  width,
  className = "",
  style = {},
  ...props
}: AsyncImageProps) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default AsyncImage;
