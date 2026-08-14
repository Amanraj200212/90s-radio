'use client'

import { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu'

const PlayListSwitcher = () => {
  const [playlist, setPlaylist] = useState("classical");

  const handleSwitch = (playlistName: string) => {
    setPlaylist(playlistName);
    console.log(playlistName,"playlist is playing");
  }
  return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button 
            className='border p-2 rounded-full hover:bg-[#BE3D34]/80 cursor-pointer transition duration-400'
          >
            Switch playlist
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white/20 text-white shadow-2xl">
          <DropdownMenuGroup>
            <DropdownMenuItem 
              data-active={playlist === "classical"}
              onClick={() => handleSwitch("classical")}
              className="cursor-pointer data-[active=true]:bg-[#BE3D34] data-[active=true]:text-white"
            >
              {"Classical 90's"}
            </DropdownMenuItem>
            <DropdownMenuItem 
              data-active={playlist === "romatics"}
              onClick={() => handleSwitch("romatics")}
              className="cursor-pointer data-[active=true]:bg-[#BE3D34] data-[active=true]:text-white"
            >
              Romantic songs
            </DropdownMenuItem>
            <DropdownMenuItem 
              data-active={playlist === "trendy"}
              onClick={() => handleSwitch("trendy")}
              className="cursor-pointer data-[active=true]:bg-[#BE3D34] data-[active=true]:text-white"
            >
              {"Trending one's"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default PlayListSwitcher