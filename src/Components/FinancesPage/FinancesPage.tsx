import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Navbar'

function FinancesComponent() {
  return (
    <div className="h-screen bg-white flex">
      <div id="side-nav" className="w-1/4 bg-[#121212]"></div>
      <div className='flex flex-col w-full'>
        <div className="h-[10%]"><Navbar page="finances"/></div>
        <div id="content" className="h-[90%] bg-black">
          <FormComponent/>
        </div>
      </div>
    </div>
  )
}

function FormComponent(){
  const intialState = {
    transactee : "",
    amount : "",
    category : "OTHER",
    description : "",
    status : "UNPAID",
    mode : "SEND",
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
    <input type="text" name="transactee" value={formData.transactee} id="" onChange={handleChange}/>
    <input type="number" name="amount" value={formData.amount} id="" onChange={handleChange}/>
    <input type="text" name="description" value={formData.description} id="" onChange={handleChange}/>
    <select name="mode" id="" value={formData.mode} onChange={handleChange}>
      <option value="SEND">SEND</option>
      <option value="RECEIVE">RECEIVE</option>
    </select>
    <select name="category" id="" value={formData.category} onChange={handleChange}>
      <option value="FOOD">FOOD</option>
      <option value="TRANSPORT">TRANSPORT</option>
      <option value="OTHER">OTHER</option>
      <option value="EDUCATION">EDUCATION</option>
      <option value="GROOMING">GROOMING</option>
    </select>
    <button  onClick={handleSubmit} className='bg-gray-600 border-green-600'>Add Item</button>
  </div>)
}



FinancesComponent.propTypes = {}

export default FinancesComponent
