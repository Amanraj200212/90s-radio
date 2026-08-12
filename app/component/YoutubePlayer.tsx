"use client";

import YouTube, { YouTubeProps } from "react-youtube";

type Props = {
  videoId: string;
  onReady?: YouTubeProps["onReady"];
  onEnd?: YouTubeProps["onEnd"];
};

const YoutubePlayer = ({ videoId, onReady, onEnd }: Props) => {
  const options: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
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
        onEnd={onEnd}
        className="block h-full w-full"
        iframeClassName="h-full w-full"
      />
    </div>
  );
};

export default YoutubePlayer;