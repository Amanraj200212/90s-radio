"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import type { YouTubeProps } from "react-youtube";
import MusicPlayer from "../components/MusicPlayer";
import YoutubePlayer from "../components/YoutubePlayer";
import { playlists, type PlaylistSelection, type Song } from "../data/songs";
import Image from "next/image";
import Header from "../components/Header";

type Player = Parameters<NonNullable<YouTubeProps["onReady"]>>[0]["target"];
const YOUTUBE_PLAYING_STATE = 1;
const FAVORITES_STORAGE_KEY = "90s-radio-favorites";
const FAVORITES_UPDATED_EVENT = "90s-radio-favorites-updated";
const allSongs = Object.values(playlists).flat() as Song[];
const songsById = new Map(allSongs.map((song) => [song.videoId, song]));
const EMPTY_FAVORITES: Song[] = [];
let cachedFavoritesRaw: string | null | undefined;
let cachedFavorites: Song[] = EMPTY_FAVORITES;

function getFavoritesSnapshot() {
  let raw: string | null;
  try {
    raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
  } catch {
    return cachedFavorites;
  }

  if (raw === cachedFavoritesRaw) return cachedFavorites;
  cachedFavoritesRaw = raw;

  try {
    const savedIds: unknown = JSON.parse(raw ?? "[]");
    const ids = Array.isArray(savedIds)
      ? [...new Set(savedIds.filter((id): id is string => typeof id === "string"))]
      : [];
    cachedFavorites = ids.flatMap((id) => {
      const song = songsById.get(id);
      return song ? [song] : [];
    });
  } catch {
    cachedFavorites = EMPTY_FAVORITES;
  }

  return cachedFavorites;
}

function subscribeToFavorites(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(FAVORITES_UPDATED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(FAVORITES_UPDATED_EVENT, onChange);
  };
}

export default function Home() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [playlist, setPlaylist] = useState<PlaylistSelection>("classical");
  const favorites = useSyncExternalStore(
    subscribeToFavorites,
    getFavoritesSnapshot,
    () => EMPTY_FAVORITES,
  );
  const [currentSong, setCurrentSong] = useState(0);
  const currentSongRef = useRef(0);
  const currentPlaylist: Song[] = playlist === "favorites"
    ? favorites
    : playlists[playlist];
  const playlistIds = currentPlaylist.map((song) => song.videoId);

  const setSongIndex = (index: number) => {
    if (index < 0) return;

    const songIndex = (index + currentPlaylist.length) % currentPlaylist.length;

    currentSongRef.current = songIndex;
    setCurrentSong(songIndex);
  };

  const changeSong = (index: number) => {
    if (currentPlaylist.length === 0) return;
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

  const switchPlaylist = (playlistName: PlaylistSelection) => {
    const nextPlaylist = playlistName === "favorites" ? favorites : playlists[playlistName];
    if (nextPlaylist.length === 0) return;
    const nextPlaylistIds = nextPlaylist.map((song) => song.videoId);

    setPlaylist(playlistName);
    currentSongRef.current = 0;
    setCurrentSong(0);

    player?.loadPlaylist(nextPlaylistIds, 0);
    player?.setLoop(true);
  };

  const toggleFavorite = () => {
    const song = currentPlaylist[currentSong];
    if (!song) return;

    const isSaved = favorites.some((favorite) => favorite.videoId === song.videoId);
    const nextFavorites = isSaved
      ? favorites.filter((favorite) => favorite.videoId !== song.videoId)
      : [...favorites, song];
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavorites.map((favorite) => favorite.videoId)));
      window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
    } catch (error) {
      console.error("Could not save favorites locally:", error);
    }

    if (playlist === "favorites" && isSaved) {
      if (nextFavorites.length === 0) {
        switchPlaylist("classical");
      } else {
        const nextIndex = Math.min(currentSong, nextFavorites.length - 1);
        currentSongRef.current = nextIndex;
        setCurrentSong(nextIndex);
        const nextIds = nextFavorites.map((favorite) => favorite.videoId);
        player?.loadPlaylist(nextIds, nextIndex);
        player?.setLoop(true);
      }
    }
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
        <Header playlist={playlist} onPlaylistSwitch={switchPlaylist} favoritesCount={favorites.length} player={player} />

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
            videoId={playlistIds[0] ?? playlists.classical[0].videoId}
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
            isFavorite={favorites.some((favorite) => favorite.videoId === currentPlaylist[currentSong].videoId)}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        <p className="corner-note">made for long drives &amp; late nights</p>
        <p className="absolute right-0 bottom-0 text-xs underline text-white/10 pr-2">@Developed By Aman Gupta</p>
      </div>
    </main>
  );
}
