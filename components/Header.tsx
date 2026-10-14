import CurrentTime from './CurrentTime'
import OnlineCount from './OnlineCount'
import PlayListSwitcher from './PlayListSwitcher'
import type { PlaylistSelection } from '@/data/songs'
import type { YouTubeProps } from 'react-youtube'
import SleepTimer from './SleepTimer'

type Player = Parameters<NonNullable<YouTubeProps['onReady']>>[0]['target'] | null

type Props = {
  playlist: PlaylistSelection;
  onPlaylistSwitch: (playlistName: PlaylistSelection) => void;
  favoritesCount: number;
  player: Player;
};

const Header = ({ playlist, onPlaylistSwitch, favoritesCount, player }: Props) => {
  return (
    <header className="topbar">
      <CurrentTime />
      <div className="font-bold"><OnlineCount /></div>
      <div className="flex items-center gap-6">
        <PlayListSwitcher playlist={playlist} onSwitch={onPlaylistSwitch} favoritesCount={favoritesCount} />
        <SleepTimer player={player} />
      </div>
    </header>
  )
}

export default Header
