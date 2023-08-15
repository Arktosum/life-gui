import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='flex bg-[#101010] text-white h-[10vh] p-2 items-center justify-between border-b-2 border-b-cyan-500'>
      <div className='text-xl font-bold'>Mein Lieben</div>
      <div className='flex gap-5'>
        <NavLink to='/finance'>
          <div>Finance</div>
        </NavLink>
        <NavLink to='/todolist'>
          <div>Todolist</div>
        </NavLink>
        <NavLink to='/todolist'>
          <div>Hall of Friends</div>
        </NavLink>
        <NavLink to='/todolist'>
          <div>Daily Diary</div>
        </NavLink>
      </div>
      
    </nav>
  )
}
