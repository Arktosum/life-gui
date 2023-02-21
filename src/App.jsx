import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Finance from './Components/Finance'
import Navbar from './Components/Navbar'
import Todolist from './Components/Todolist'

export default function App() {
  let [renderState,render] = useState(false)
  function rerender(){
    setTimeout(()=>{
      console.log('rerendering')
      render(!renderState)
    },300)
  }
  return (<>
  <Navbar props={{rerender,renderState}}/>
  <Routes>
    <Route path="/" element={<Finance props={{rerender,renderState}}/>}></Route>
    <Route path="/todos" element={<Todolist props={{rerender,renderState}}/>}></Route>
  </Routes>
  
  </>)
}
