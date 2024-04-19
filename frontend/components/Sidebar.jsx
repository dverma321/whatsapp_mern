import React from 'react'
import SearchBar from './Sidebar/SearchBar'
import Conversations from './Sidebar/Conversations'
import LogoutButton from './Sidebar/LogoutButton'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col' style={{border:'2px solid #000'}}>
        <SearchBar />
        <div className='divider px-3'></div>
        <Conversations />
        <LogoutButton />
    </div>
  )
}

export default Sidebar