import React from 'react'
import SearchBar from './Sidebar/SearchBar'
import Users from './Sidebar/Users'
import LogoutButton from './Sidebar/LogoutButton'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchBar />
        <div className='divider px-3'></div>
        <Users />
        <div className='divider px-3'></div>
        <LogoutButton  />
    </div>
  )
}

export default Sidebar