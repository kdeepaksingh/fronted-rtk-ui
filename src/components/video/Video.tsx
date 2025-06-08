import React from "react";
import { Box, Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Translate from "../typography/Translate";

interface VideoData {
  src: string;
  isPlaying: boolean;
  title: string;
}

interface VideoComponentProps {
  videoUrl: VideoData;
  imageUrl: string;
  playVideo: (title: string) => void;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  videoUrl,
  imageUrl,
  playVideo,
}) => {
  const handleClick = (title: string) => {
    playVideo(title);
  };

  return (
    <div>
      <Box sx={{ position: "relative" }}>
        {!videoUrl.isPlaying && (
          <div>
            <img
              src={imageUrl}
              alt="Video Thumbnail"
              className="thumbnail-css"
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
              }}
            >
              <Button
                variant="outlined"
                className="play-btn-circle"
                onClick={() => handleClick(videoUrl.title)}
              >
                <PlayArrowIcon />
              </Button>
            </Box>
          </div>
        )}

        {videoUrl.isPlaying && (
          <video controls autoPlay muted loop className="thumbnail-video">
            <source src={videoUrl.src} type="video/mp4" />
          </video>
        )}
      </Box>

      <Typography className="text-white !mt-4 font-upag-open-sans">
        <Translate dataKey={videoUrl.title} />
      </Typography>
    </div>
  );
};

export default VideoComponent;
