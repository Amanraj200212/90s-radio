"use client";

import { useRef, useState } from "react";
import type { YouTubeProps } from "react-youtube";
import MusicPlayer from "../components/MusicPlayer";
import YoutubePlayer from "../components/YoutubePlayer";
import { playlists, type PlaylistName } from "../data/songs";
import Image from "next/image";
import Header from "../components/Header";

type Player = Parameters<NonNullable<YouTubeProps["onReady"]>>[0]["target"];
const YOUTUBE_PLAYING_STATE = 1;

export default function Home() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [playlist, setPlaylist] = useState<PlaylistName>("classical");
  const [currentSong, setCurrentSong] = useState(0);
  const currentSongRef = useRef(0);
  const currentPlaylist = playlists[playlist];
  const playlistIds = currentPlaylist.map((song) => song.videoId);

  const setSongIndex = (index: number) => {
    if (index < 0) return;

    const songIndex = (index + currentPlaylist.length) % currentPlaylist.length;

    currentSongRef.current = songIndex;
    setCurrentSong(songIndex);
  };

  const changeSong = (index: number) => {
    setSongIndex(index);
    player?.loadPlaylist(playlistIds, index);
    player?.setLoop(true);
  };

  const nextSong = () => {
    const nextIndex =
      (currentSongRef.current + 1) % currentPlaylist.length;

    changeSong(nextIndex);
  };

  const prevSong = () => {
    const prevIndex =
      (currentSongRef.current - 1 + currentPlaylist.length) % currentPlaylist.length;

    changeSong(prevIndex);
  };

  const switchPlaylist = (playlistName: PlaylistName) => {
    const nextPlaylist = playlists[playlistName];
    const nextPlaylistIds = nextPlaylist.map((song) => song.videoId);

    setPlaylist(playlistName);
    currentSongRef.current = 0;
    setCurrentSong(0);

    player?.loadPlaylist(nextPlaylistIds, 0);
    player?.setLoop(true);
  };

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
        <Header playlist={playlist} onPlaylistSwitch={switchPlaylist} />

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
            videoId={playlistIds[0]}
            onReady={(event) => {
              setPlayer(event.target);
              event.target.loadPlaylist(playlistIds, currentSongRef.current);
              event.target.setLoop(true);
            }}
            onStateChange={(event) => {
              if (event.data === YOUTUBE_PLAYING_STATE) {
                setSongIndex(event.target.getPlaylistIndex());
              }
            }}
          />
        </div>

        <div className="player-dock">
          <MusicPlayer
            player={player}
            onNext={nextSong}
            onPrev={prevSong}
            title={currentPlaylist[currentSong].title}
            artist={currentPlaylist[currentSong].artist}
            videoId={currentPlaylist[currentSong].videoId}
          />
        </div>

        <p className="corner-note">made for long drives &amp; late nights</p>
        <p className="absolute right-0 bottom-0 text-xs underline text-white/10 pr-2">@Developed By Aman Gupta</p>
      </div>
    </main>
  );
}
