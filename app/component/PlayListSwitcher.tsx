import React from 'react'

const PlayListSwitcher = () => {
  const handleSwitch = () => {
    console.log('click')
  }
  return (
      <button 
        onClick={handleSwitch}
        className='border p-2 rounded-full hover:bg-[#BE3D34]/80 cursor-pointer transition duration-400'
      >
        Switch playlist
      </button>
  )
}

export default PlayListSwitcher