import React from 'react'
import PropTypes from 'prop-types'

import { addTodo, fetchPosts } from '../../features/todoSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Navbar from '../Navbar';


function TodosComponent() {
  const todos = useAppSelector(state=>state.todo.todos);
  const dispatch = useAppDispatch();

  dispatch(addTodo());
  dispatch(fetchPosts());

  return (
    <div className="h-screen bg-white flex">
      <div id="side-nav" className="w-1/4 bg-[#121212]"></div>
      <div className='flex flex-col w-full'>
        <div className="h-[10%]"><Navbar page="todos"/></div>
        <div id="content" className="h-[90%] bg-black"></div>
      </div>
    </div>
  )
}

TodosComponent.propTypes = {}

export default TodosComponent
