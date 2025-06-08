import { useState } from "react";
import { Box, Grid } from "@mui/material";
import VideoComponent from "./Video";
import SectionTitle from "../typography/SectionTitle";

type VideoData = {
  src: string;
  isPlaying: boolean;
  title: string;
};

const videoUrl = import.meta.env.PUBLIC_URL + "/assets/video/home-video.mp4";
const videoUrl1 = import.meta.env.PUBLIC_URL + "/assets/video/home-video.mp4";

const VideoGallery = () => {
  const [videos, setVideos] = useState<VideoData[]>([
    { src: videoUrl, isPlaying: false, title: "Typo.IntroStandard" },
    { src: videoUrl1, isPlaying: false, title: "Typo.OverviewSub" },
  ]);

  const playVideo = (title: string) => {
    const updatedVideos = videos.map((video) => ({
      ...video,
      isPlaying: video.title === title,
    }));
    setVideos(updatedVideos);
  };

  const tutorialThumbnail =
    import.meta.env.PUBLIC_URL + "/assets/png/VideoThumbnail.PNG";

  return (
    <Box
      className="flex justify-center items-center bg-cover"
      sx={{
        backgroundImage: "url(/assets/jpg/tutorial-videos-bg.png)",
      }}
    >
      <div className="container">
        <Box className="overlay-tutorials">
          <SectionTitle text="Tutorials" className="!text-white" />
          <Grid container spacing={4} className="!flex !mt-[20px]">
            {videos.map((video) => (
              <Grid item xs={12} md={6} key={video.title}>
                <VideoComponent
                  videoUrl={video}
                  imageUrl={tutorialThumbnail}
                  playVideo={playVideo}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </Box>
  );
};

export default VideoGallery;
