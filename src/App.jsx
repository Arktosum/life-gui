import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Finance from './Components/Finance'
import Navbar from './Components/Navbar'
import Todolist from './Components/Todolist'
import './App.css'
import HoFriends from './Components/HoFriends'
export default function App() {
  let [render,Rerender] = useState(false)
  function rerender(){
    setTimeout(()=>{
      Rerender(prev=>!prev)
    },200)
  }
  return (
  <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Finance props={{render,rerender}}/>}></Route>
      <Route path="/todolist" element={<Todolist props={{render,rerender}}/>}></Route>
      <Route path="/hofriends" element={<HoFriends props={{render,rerender}}/>}></Route>
      
    </Routes>
  </>)
}
