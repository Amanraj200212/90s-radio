'use client'

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu'
import type { PlaylistSelection } from '@/data/songs';
import { toast } from './ui/toast';

type Props = {
  playlist: PlaylistSelection;
  onSwitch: (playlistName: PlaylistSelection) => void;
  favoritesCount: number;
};

const PlayListSwitcher = ({ playlist, onSwitch, favoritesCount }: Props) => {
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
              data-active={playlist === "favorites"}
              onClick={() => {
                onSwitch("favorites");
                toast.add({
                  type: favoritesCount ? "success" : "error",
                  title: favoritesCount ? "FAVORITES PLAYING" : "NO FAVORITES YET",
                  description: favoritesCount
                    ? `Playing your ${favoritesCount} favorite ${favoritesCount === 1 ? "song" : "songs"}.`
                    : "Tap the heart on a song to add it to your favorites.",
                });
              }}
              className="cursor-pointer data-[active=true]:bg-[#BE3D34] data-[active=true]:text-white"
            >
              Favorites {favoritesCount > 0 ? `(${favoritesCount})` : ""}
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
              Insomanic Nights
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default PlayListSwitcher
