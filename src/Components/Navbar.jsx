import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  
  return (
    <div className="min-h-[10vh] bg-[#18191e] flex justify-end items-center border-b-2 border-cyan-600">
      <div className='text-cyan-600 animate-pulse duration-200 text-2xl flex-1 p-5'>Mein Leiben</div>
      <div className="p-5 cursor-pointer duration-200 ease-in-out" onClick={()=>{
        let HIDDEN_BAR = document.getElementById('dropdown-menu')
        if(HIDDEN_BAR.classList.contains('hidden')){
          console.log("flex!")
          HIDDEN_BAR.classList.remove('hidden')
          HIDDEN_BAR.classList.add('flex')
        }
        else{
          console.log("Hidden!")
          HIDDEN_BAR.classList.remove('flex')
          HIDDEN_BAR.classList.add('hidden')
        }
        
      }}>
        <img src="hamburger-menu.png" alt="" className='w-full h-full hover:scale-125'/>
      </div>

      <div id="dropdown-menu" className="dropdown-menu hidden absolute bg-gray-900 flex-col justify-between top-[10vh] duration-200">
      <Link to="/todos"><div className='text-white text-sm hover:bg-slate-700 p-5'>Todos</div></Link>
        <Link to="/"><div className='text-white text-sm hover:bg-slate-700 p-5'>Finance</div></Link>
        <div className='text-white text-sm hover:bg-slate-700 p-5'>Diary</div>
        <div className='text-white text-sm hover:bg-slate-700 p-5'>Hall of Friends</div>
      </div>
      
    </div>
  )
}
