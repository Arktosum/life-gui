import React, { useState } from 'react'
import Finance from './Components/Finance'
import Navbar from './Components/Navbar'

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
  <Finance props={{rerender,renderState}}/>
  </>)
}
