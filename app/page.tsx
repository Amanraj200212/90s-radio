"use client";

import { useState } from "react";
import { YouTubeProps } from "react-youtube";
import OnlineCount from "./component/OnlineCount";
import MusicPlayer from "./component/MusicPlayer";
import YoutubePlayers from "./component/YoutubePlayer";
import { songs } from "@/data";
import Image from "next/image";

type Player = Parameters<
  NonNullable<YouTubeProps["onReady"]>
>[0]["target"];

export default function Home() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentSong, setCurrentSong] = useState(0);

  const nextSong = () => {
    const nextIndex = (currentSong + 1) % songs.length;
    setCurrentSong(nextIndex);
    if(player){
      player.loadVideoById(songs[nextIndex].videoId)};
  };

  const prevSong = () => {
    const prevIndex = (currentSong - 1 + songs.length) % songs.length;
    setCurrentSong(prevIndex);
    console.log(prevIndex,"previndex")
    if(player){
      player.loadVideoById(songs[prevIndex].videoId)};
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black p-5">
      <Image 
        src="/world.jpg" 
        alt="home_bg" 
        fill 
        priority 
        className="object-contain"
      />

    {/* for bACKGROUND overlay */}
      {/* <div className="absolute inset-0 bg-black/10" /> */}

      <div className="relative z-10 flex min-h-screen flex-col" >
        <div className="p-5">
          <OnlineCount />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-2xl w-full px-5">
        <YoutubePlayers
          videoId={songs[currentSong].videoId}
          onReady={(event) => {
            setPlayer(event.target);
          }}
          onEnd={nextSong}
        />
        
        <div className="mt-auto flex justify-center px-5 pb-5">
         <MusicPlayer 
            player={player} 
            onNext={nextSong} 
            onPrev={prevSong} 
            title={songs[currentSong].title} 
            artist={songs[currentSong].artist}
          />
        </div>
      </div>
    </main>
  );
}