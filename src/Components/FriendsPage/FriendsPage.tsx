import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Navbar'

function FriendsComponent() {
  return (
    <div className="h-screen bg-white flex">
      <div id="side-nav" className="w-1/4 bg-[#121212]"></div>
      <div className='flex flex-col w-full'>
        <div className="h-[10%]"><Navbar page="friends"/></div>
        <div id="content" className="h-[90%] bg-black"></div>
      </div>
    </div>
  )
}

FriendsComponent.propTypes = {}

export default FriendsComponent
