"use client";

import { useState } from "react";
import type { YouTubeProps } from "react-youtube";
import OnlineCount from "./component/OnlineCount";
import MusicPlayer from "./component/MusicPlayer";
import YoutubePlayer from "./component/YoutubePlayer";
import { songs } from "@/data";
import Image from "next/image";
import CurrentTime from "./component/CurrentTime";
import Link from "next/link";

type Player = Parameters<NonNullable<YouTubeProps["onReady"]>>[0]["target"];

export default function Home() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentSong, setCurrentSong] = useState(0);

  const changeSong = (index: number) => {
    setCurrentSong(index);
    player?.loadVideoById(songs[index].videoId);
  };

  const nextSong = () => changeSong((currentSong + 1) % songs.length);
  const prevSong = () => changeSong((currentSong - 1 + songs.length) % songs.length);

  return (
    <main className="isolate relative min-h-screen overflow-hidden bg-black">
      <Image
        src="/world.jpg"
        alt="home_bg" 
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-100 -z-3"
      />
      <div className="hero-wash" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="hero-content">
        <header className="topbar">
          <CurrentTime />
          <div className="font-bold"><OnlineCount /></div>

          <div className="topbar-actions">
            <Link  href="https://open.spotify.com" target="_blank" rel="noreferrer">
              <span className="service-mark spotify-mark" aria-hidden="true">◔</span>
              <span>Spotify ↗</span>
            </Link>
            <Link href="https://music.youtube.com" target="_blank" rel="noreferrer">
              <span className="service-mark youtube-mark" aria-hidden="true">▶</span>
              <span >YT Music ↗</span>
            </Link>
          </div>
        </header>

        <section className="hero-title" aria-labelledby="radio-title">
          <p className="eyebrow">a radio for the after-school hours</p>
          <h1 id="radio-title">
            90s
            <span>something</span>
          </h1>
          <p className="hero-subtitle">Press play, stay awhile.</p>
        </section>


        <div className="hidden-player" aria-hidden="true">
          <YoutubePlayer
            videoId={songs[currentSong].videoId}
            onReady={(event) => setPlayer(event.target)}
            onEnd={nextSong}
          />
        </div>

        <div className="player-dock">
          <MusicPlayer
            player={player}
            onNext={nextSong}
            onPrev={prevSong}
            title={songs[currentSong].title}
            artist={songs[currentSong].artist}
            trackNumber={currentSong + 1}
          />
        </div>

        <p className="corner-note">made for long drives &amp; late nights</p>
      </div>
    </main>
  );
}
