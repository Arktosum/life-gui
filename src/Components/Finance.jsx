import React, { useEffect, useState } from 'react'
import { POST } from './Utils'

export default function Finance() {
  let [formData,setformData] = useState({name:"",mode:"send",category:"food",amount:"",remarks:""})
  let [financeList,setfinanceList] = useState([])

  useEffect(()=>{
    
  },[])
  function handleSubmit(){
    console.log(formData)
    
    // reset form data
    setformData({name:"",mode:"send",category:"food",amount:"",remarks:""})
  }
  return (
    <div className='min-h-screen bg-black'>
      <FinanceForm/>

    </div>
  )
}


function FinanceForm(){
  return(<>
  <div className='p-5'>
        <label htmlFor="name" className='text-white text-sm m-1'>Name: </label>
        <input type="text" onChange={(e)=>{setformData({...formData,name:e.target.value})}}/>
      </div>
      <div className='p-5'>
        <label htmlFor="mode" className='text-white text-sm m-1'>Mode: </label>
        <select name="mode" id="" onChange={(e)=>{setformData({...formData,mode:e.target.value})}}>
          <option value="send">Send</option>
          <option value="receive">Receive</option>
        </select>
      </div>
      <div className='p-5'>
        <label htmlFor="category" className='text-white text-sm m-1'>Category: </label>
        <select name="category" id="" onChange={(e)=>{setformData({...formData,category:e.target.value})}}>
          <option value="food">Food</option>
          <option value="education">Education</option>
          <option value="transport">Transport</option>
        </select>
      </div>
      <div className='p-5'>
        <label htmlFor="amount" className='text-white text-sm m-1'>Amount: </label>
        <input type="number" onChange={(e)=>{setformData({...formData,amount:e.target.value})}}/>
      </div>
      <div className='p-5'>
        <label htmlFor="remarks" className='text-white text-sm m-1'>Remarks: </label>
        <input type="text" onChange={(e)=>{setformData({...formData,remarks:e.target.value})}}/>
      </div>
      <div className='
      inline p-5 border-cyan-600 border-2 rounded-xl cursor-pointer hover:scale-125
      hover:bg-cyan-400 hover:text-black duration-200 ease-in-out 
      text-cyan-500' onClick={()=>{handleSubmit()}}>Submit</div>
  </>)
}