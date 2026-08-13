'use client'

import { useEffect, useState } from "react";
import type { YouTubeProps } from "react-youtube";


type Props = {
  player: Parameters<NonNullable<YouTubeProps["onReady"]>>[0]["target"] | null;
}

const ProgressBar = ({player}: Props) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
      if(!player) return;

      const updateProgress = () => {
        setCurrentTime(player.getCurrentTime());
        setDuration(player.getDuration());
      };

      updateProgress();

      const interval = setInterval(updateProgress, 500);
      return() => clearInterval(interval);
    },[player])


    const formatTime = (second: number) => {
      const minutes = Math.floor(second / 60);
      const remainingSeconds = Math.floor(second % 60);

    return `${String(
        minutes
      ).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2,"0")
    }`;
  }

  const handleclickprogressBar = (event: React.MouseEvent<HTMLSpanElement>) => {
    if(!player || !duration) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const clickPostion = event.clientX - rect.left;

    const percentage = clickPostion / rect.width;

    const newTime = percentage * duration;

    player.seekTo(newTime, true);

    setCurrentTime(newTime);
  }

  return (
    <div className="progress-row" aria-label="Track progress">
      <span 
        className="progress-line"
        onClick={handleclickprogressBar}
        role="slider"
        aria-label="seek through song"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        tabIndex={0}
      >
        <i 
          style={{
            width: duration 
            ? `${(currentTime / duration) * 100}%` 
            : "0%",
          }}
        />
      </span>
      <time>{currentTime ? `${formatTime(currentTime)}` : '00:00'}</time>
      <time> {duration ? `${formatTime(duration)}`: '00:00'}</time>
    </div>
  )
}

export default ProgressBar