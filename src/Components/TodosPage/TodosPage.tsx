import React, { useState } from 'react'
import PropTypes from 'prop-types'
import brandLogo from '../../assets/lifegui-logo.svg'

import { addTodo, fetchPosts } from '../../features/todoSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';


function TodosComponent() {
  const todos = useAppSelector(state=>state.todo.todos);
  const dispatch = useAppDispatch();

  dispatch(addTodo());
  dispatch(fetchPosts());

  return (
    <div className="h-screen bg-white flex">
      <div id="side-nav" className="w-1/4 bg-[#121212]"><SideNavigation/></div>
      <div className='flex flex-col w-full'>
        <div className="h-[10%]"><Navbar page="todos"/></div>
        <div id="content" className="h-[90%] bg-black">
          <FormComponent/>
        </div>
      </div>
    </div>
  )
}

function SideNavigation(){
  return (
  <div className='h-full'>
    <div className="h-[10%] grid place-content-center">
      <Link to="/"><img src={brandLogo} alt=""/></Link>
    </div>
    <div className="h-auto">

    </div>
  </div>
  )
}
function FormComponent(){
  const intialState = {
    title : "",
    description : "",
    dueDate : "",
    status : "PENDING",
    priority : "LOW",
    subtasks : [],
    isSubtask : false
  }
  const [formData,setformData] = useState(intialState)
  function handleSubmit(){
    console.log(formData);
    setformData(intialState);
  }
  function handleChange(e : any){
    setformData(prev=>{return {...prev,[e.target.name] : e.target.value}})
  }
  return (<div className='flex flex-col'>
    <input type="text" name="title" value={formData.title} id="" onChange={handleChange}/>
    <input type="text" name="description" value={formData.description} id="" onChange={handleChange}/>
    <select name="priority" id="" value={formData.priority} onChange={handleChange}>
      <option value="LOW">LOW</option>
      <option value="MEDIUM">MEDIUM</option>
      <option value="HIGH">HIGH</option>
    </select>
    <input type="datetime-local" name="dueDate" value={formData.dueDate} id="" onChange={handleChange}/>
    <button  onClick={handleSubmit} className='bg-gray-600 border-green-600'>Add Item</button>
  </div>)
}

TodosComponent.propTypes = {}

export default TodosComponent
