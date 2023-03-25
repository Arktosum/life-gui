import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
let hamburgerIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

// ahh.. how do I see the result?
export default function Navbar() {
  let [showdropDown,setshowdropDown] = useState(false);
  return (<>
    <nav className="bg-[#010101] h-[10vh] p-5 items-center justify-between hidden md:flex">
      <div className="text-bold text-xl text-white"><Link to="/">Mein Leiben</Link></div>
      <div className="text-bold text-sm text-white"><Link to="/todolist">TodoList</Link></div>
      <div className="text-bold text-sm text-white"><Link to="/">Finance</Link></div>
      <div className="text-bold text-sm text-white"><Link to="/hofriends">Hall of Friends</Link></div>
      <div className="text-bold text-sm text-white">Daily Diary</div>
    </nav>
    <nav className="bg-[#010101] p-8 flex justify-between md:hidden border-b-cyan-600 border-2 border-black">
      <div className="text-bold text-xl text-white"><Link to="/">Mein Leiben</Link></div>
      <div className="hover:scale-125" onClick={()=>{setshowdropDown(prev=>!prev);}}>{hamburgerIcon}</div>
    </nav>
    <div className={`bg-[#000000] ${showdropDown?'drop-down':'come-back'} flex flex-col text-center`}>
      <Link to="/todolist"><div className="text-bold text-sm text-white hover:bg-[#1d1d1d] py-2">TodoList</div></Link>
      <Link to="/"><div className="text-bold text-sm text-white hover:bg-[#1d1d1d] py-2">Finance</div></Link>
      <Link to="/hofriends"><div className="text-bold text-sm text-white hover:bg-[#1d1d1d] py-2">Hall of Friends</div></Link>
      <div className="text-bold text-sm text-white hover:bg-[#1d1d1d] py-2">Daily Diary</div>
    </div>
</>)}
