'use client'

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu'
import type { PlaylistName } from '@/data/songs';
import { toast } from './ui/toast';
import { Heart } from 'lucide-react';

type Props = {
  playlist: PlaylistName;
  onSwitch: (playlistName: PlaylistName) => void;
};

const PlayListSwitcher = ({ playlist, onSwitch }: Props) => {
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
              onClick={() => {
                onSwitch("classical")
                toast.add({
                  type: 'success',
                  title: "SWITCHED SUCCESSFULLY!",
                  description: "A collection of timeless classical songs with beautiful melodies and soulful compositions.",
                })
              }}
              className="cursor-pointer data-[active=true]:bg-[#BE3D34] data-[active=true]:text-white"
            >
              {"Classical 90's"}
            </DropdownMenuItem>
            <DropdownMenuItem 
              data-active={playlist === "romantic"}
              onClick={() => {
                onSwitch("romantic")
                toast.add({
                  type: 'success',
                  title: "SWITCHED SUCCESSFULLY!",
                  description: "A handpicked collection of romantic songs to set the your mood.",
                })
              }}
              className="cursor-pointer data-[active=true]:bg-[#BE3D34] data-[active=true]:text-white"
            >
              Romantic songs
            </DropdownMenuItem>
            <DropdownMenuItem 
              data-active={playlist === "trendy"}
              onClick={() => {
                onSwitch("trendy")
                toast.add({
                  type: 'success',
                  title: "SWITCHED SUCCESSFULLY!",
                  description: "Listen to the seasonal songs according to our enviroment & Embrace your feelings.",
                })
              }}
              className="cursor-pointer data-[active=true]:bg-[#BE3D34]/70 data-[active=true]:text-white"
            >
              Aazadi special<Heart className='text-red-500 fill-red-500' />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default PlayListSwitcher
