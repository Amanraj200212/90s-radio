"use client";

import YouTube, { YouTubeProps } from "react-youtube";

type Props = {
  videoId: string;
  onReady?: YouTubeProps["onReady"];
  onStateChange?: YouTubeProps["onStateChange"];
};

const YoutubePlayer = ({
  videoId,
  onReady,
  onStateChange,
}: Props) => {
  const options: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      playsinline: 1,
    },
  };

  return (
    <div className="aspect-video w-full">
      <YouTube
        videoId={videoId}
        opts={options}
        onReady={onReady}
        onStateChange={onStateChange}
        className="block h-full w-full"
        iframeClassName="h-full w-full"
      />
    </div>
  );
};

export default YoutubePlayer;