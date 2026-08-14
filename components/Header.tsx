import CurrentTime from './CurrentTime'
import OnlineCount from './OnlineCount'
import Link from 'next/link'
import PlayListSwitcher from './PlayListSwitcher'
import type { PlaylistName } from '@/data/songs'

type Props = {
  playlist: PlaylistName;
  onPlaylistSwitch: (playlistName: PlaylistName) => void;
};

const Header = ({ playlist, onPlaylistSwitch }: Props) => {
  return (
    <header className="topbar">
          <CurrentTime />
          <div className="font-bold"><OnlineCount /></div>

          <div className=" flex items-center gap-6">
            <PlayListSwitcher playlist={playlist} onSwitch={onPlaylistSwitch} />
            <Link href="https://music.youtube.com" className='hidden md:inline-flex' target="_blank" rel="noreferrer">
              <span className="service-mark youtube-mark mr-2" aria-hidden="true">▶</span>
              <span >YT Music ↗</span>
            </Link>
          </div>
        </header>
  )
}

export default Header
