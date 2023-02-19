import React from 'react'

export default function Navbar() {
  let [navState,toggleNav] = React.useState(false)
  return (
    <div className="min-h-[10vh] bg-[#18191e] flex justify-end items-center border-b-2 border-cyan-600">
      <div className='text-cyan-600 animate-pulse duration-200 text-2xl flex-1 p-5'>Mein Leiben</div>
      <div className="p-5 cursor-pointer duration-200 ease-in-out" onClick={()=>{toggleNav(!navState)}}>
        <img src="hamburger-menu.png" alt="" className='w-full h-full hover:scale-125'/>
      </div>
      {navState ? 
      <div className="flex absolute bg-gray-900 flex-col justify-between top-[10vh]">
        <div className='text-white text-sm hover:bg-slate-700 p-5'>Todos</div>
        <div className='text-white text-sm hover:bg-slate-700 p-5'>Finance</div>
        <div className='text-white text-sm hover:bg-slate-700 p-5'>Diary</div>
        <div className='text-white text-sm hover:bg-slate-700 p-5'>Hall of Friends</div>
      </div> : <></>}
    </div>
  )
}
