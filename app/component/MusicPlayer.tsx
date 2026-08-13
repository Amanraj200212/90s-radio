"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useState } from "react";
import type { YouTubeProps } from "react-youtube";
import ProgressBar from "./ProgressBar";

type Props = {
  player: Parameters<NonNullable<YouTubeProps["onReady"]>>[0]["target"] | null;
  onNext: () => void;
  onPrev: () => void;
  title: string;
  artist: string;
  trackNumber: number;
};

export default function MusicPlayer({
  player,
  onNext,
  onPrev,
  title,
  artist,
  trackNumber,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  //ask youtube is ideo playing or not
  useEffect(() => {
  if (!player) return;

  const updateState = () => {
    setIsPlaying(player.getPlayerState() === 1);
  };

  updateState();

  const interval = setInterval(updateState, 300);

  return () => clearInterval(interval);
}, [player]);

const togglePlayback = () => {
  if (!player) return;
  const state = player.getPlayerState();

  if (state === 1) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};

  return (
    <section className="music-player" aria-label="Music player">
      <div className="album-art animate-spin [animation-duration:8s]" aria-hidden="true">
        <span>90s</span>
        <i />
        <b>{String(trackNumber).padStart(2, "0")}</b>
      </div>

      <div className="track-details">
        <div className="track-heading">
          <div>
            <p className="now-playing">now playing</p>
            <h2>{title}</h2>
            <p>{artist}</p>
          </div>
          <span className="track-count">{String(trackNumber).padStart(2, "0")}</span>
        </div>

        <ProgressBar player={player}/>
      </div>

      <div className="controls">
        <button type="button" onClick={onPrev} aria-label="Previous song" className="skip-button">
          <SkipBack />
        </button>
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause song" : "Play song"}
          className="play-button"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button type="button" onClick={onNext} aria-label="Next song" className="skip-button">
          <SkipForward />
        </button>
      </div>
    </section>
  );
}
