"use client";

import { useEffect, useState } from "react";
import type { YouTubeProps } from "react-youtube";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type Props = {
  player: Parameters<NonNullable<YouTubeProps["onReady"]>>[0]["target"] | null;
};

export default function SleepTimer({ player }: Props) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (remaining === null || !player) return;

    const timeout = setTimeout(() => {
      if (remaining <= 1) {
        player?.pauseVideo();
        setRemaining(null);
        return;
      }
      setRemaining(remaining - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [remaining, player]);

  const startTimer = (minutes: number) => {
    setRemaining(minutes * 60);
  };

  const cancelTimer = () => {
    setRemaining(null);
  };

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const remainder = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainder}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className={`border p-2 rounded-full hover:bg-[#BE3D34]/80 cursor-pointer transition duration-400 ${remaining !== null ? "bg-[#BE3D34]/80" : ""}`}
          aria-label={remaining === null ? "Set sleep timer" : `Sleep timer: ${formatCountdown(remaining)} remaining`}
        >
          {remaining === null ? "Sleep timer" : `Pause in ${formatCountdown(remaining)}`}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white/20 text-white shadow-2xl">
        <DropdownMenuGroup>
          {[15, 30, 60,120].map((minutes) => (
            <DropdownMenuItem
              key={minutes}
              onClick={() => startTimer(minutes)}
              className="cursor-pointer data-[active=true]:bg-[#BE3D34] data-[active=true]:text-white"
            >
              {minutes} minutes
            </DropdownMenuItem>
          ))}
          {remaining !== null && (
            <DropdownMenuItem
              onClick={cancelTimer}
              className="cursor-pointer data-[active=true]:bg-[#BE3D34] data-[active=true]:text-white"
            >
              Cancel timer
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
