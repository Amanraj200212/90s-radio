import CurrentTime from './CurrentTime'
import OnlineCount from './OnlineCount'
import Link from 'next/link'
import PlayListSwitcher from './PlayListSwitcher'

const Header = () => {
  return (
    <header className="topbar">
          <CurrentTime />
          <div className="font-bold"><OnlineCount /></div>

          <div className=" flex items-center gap-6">
            {/* <Link  href="https://open.spotify.com" target="_blank" rel="noreferrer">
              <span className="service-mark spotify-mark" aria-hidden="true">◔</span>
              <span>Spotify ↗</span>
            </Link> */}
            <PlayListSwitcher />
            <Link href="https://music.youtube.com" className='hidden md:inline-flex' target="_blank" rel="noreferrer">
              <span className="service-mark youtube-mark mr-2" aria-hidden="true">▶</span>
              <span >YT Music ↗</span>
            </Link>
          </div>
        </header>
  )
}

export default Header