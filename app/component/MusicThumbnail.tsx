'use client'

import Image from 'next/image';
import { useState } from 'react';

function MusicThumbnail({title, isPlaying, videoId}: {title: string, isPlaying: boolean, videoId:string}) {
  const [imageError, setIsImageError] = useState(false);

  return (
    <div className="album-art" aria-hidden="true">
      {!imageError ? (
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          fill
          onError={() => setIsImageError(true)}
          className={`object-cover smooth-rotate ${isPlaying ? 'playing' : ''}`}
        />
      ) : (
        <Image
          src='/diskPlayer.webp'
          alt='diskplayer'
          fill
          className={`object-cover smooth-rotate ${isPlaying ? 'playing' : ''}`}
        />
      )}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40"/>
    </div>
  )
}

export default MusicThumbnail