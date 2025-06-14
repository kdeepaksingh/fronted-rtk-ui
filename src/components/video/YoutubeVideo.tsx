import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface YoutubeVideoProps {
  link: string;
  title: string;
  className?: string;
}

const YoutubeVideo: React.FC<YoutubeVideoProps> = ({
  link,
  title,
  className,
}) => {
  const iframeZoomLevel = useSelector(
    (state: RootState) => state.global.iframeZoomLevel
  );

  return (
    <iframe
      title={title}
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${link}?rel=0`}
      allowFullScreen
      className={className}
      style={{
        zoom: iframeZoomLevel,
      }}
    ></iframe>
  );
};

export default YoutubeVideo;
