"use client";

import { useState } from "react";
import { YouTubeProps } from "react-youtube";

type Props = {
  player: Parameters<
    NonNullable<YouTubeProps["onReady"]>
  >[0]["target"] | null;
  onNext: () => void;
  onPrev: () => void;
  title: string;
  artist: string;
};

const MusicPlayer = ({ player, onNext, onPrev, title, artist }: Props) => {
  const [isplaying, setIsPlaying] = useState(true);
  const handleplayBtn = () => {
    if(isplaying) {
      setIsPlaying(false)
      player?.playVideo()
    } else {setIsPlaying(true)
      player?.pauseVideo()
    };
  }
 
  return (
    <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-black/50 text-white shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col justify-center items-start m-2.5">
        <h2 className="truncate text-lg font-semibold">{title}</h2>
        <p className="truncate text-sm text-white/60">{artist}</p>
      </div>

      <div className="flex p-4 items-center justify-center gap-8">
        <button
        onClick={onPrev}
        className="transition hover:scale-110"
        aria-label="Previous song"
        >
          ⏭ prev
        </button>
      
      {isplaying ? (
        <button
        onClick={handleplayBtn}
        className="transition hover:scale-110"
        aria-label="Previous song"
      >
        ▶ Play
      </button>
      ) : (
        <button
        onClick={handleplayBtn}
        className="transition hover:scale-110"
        aria-label="Previous song"
      >
        ⏸ Pause
      </button>
      )}
      
      <button
        onClick={onNext}
        className="transition hover:scale-110"
        aria-label="Previous song"
      >
          ⏭ prev
      </button>
      </div>
    </div>
  );
};

export default MusicPlayer;