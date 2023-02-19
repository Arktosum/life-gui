import React, { useEffect, useState } from 'react'
import { GET,POST } from './Utils'
import '../App.css'

export default function Finance(props) {
  let {rerender,renderState} = props.props
  let [financeList,setfinanceList] = useState([])
  let [balance,setBalance] = useState(0)
  useEffect(()=>{
    GET('/api/finance/read',(data)=>{
      let balance = 0
      setfinanceList(data)
      for(let row of data){
        balance+= row.amount * (row.mode == 'send' ? -1 : 1) * (row.checked ? 0 : 1)
      }
      setBalance(balance)
    })
  },[renderState])
  
  let items = financeList.map((item)=>{
    return (<FinanceItem key={item.id} props={{item,rerender}}/>)
  })
  return (
    <div className='min-h-screen bg-black flex flex-col'>
      <FinanceForm render = {rerender}/>
      <div className='font-bold text-white'>Balance : {balance}</div>
      <div className='grid gap-5
      sm:grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      '>
        {items}
      </div>
      
    </div>
  )
}

function FinanceItem(props){
  let {item,rerender} = props.props
  // Item card
  function handleDelete(){
    let randNum = Math.floor(Math.random()*10)
    let choice = prompt(`Are you sure you want to delete? Type ${randNum} to delete`);
    if(choice!=randNum){
      alert("Not successfull,try again");
      return;
    }
    else{
      alert("Deleted Successfully!");
      POST('/api/finance/delete',item)
      rerender()
    }
  
  }
  function handleUpdate(){
    item.checked = !item.checked
    POST('/api/finance/update',item)
    rerender()
  }
  let checkedIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-6 h-6">
  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>)
  let deleteIcon = (<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>)
  let uncheckedIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" className="w-6 h-6">
  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
</svg>)


  return (<>
  <div className="bg-[#1E1D20] p-3 rounded-xl min-w-[80vw] sm:min-w-[30vw]
  hover:bg-gray-800 duration-200 ease-in-out hover:scale-105 cursor-pointer border-black border-2 border-b-cyan-600">
    <div className="w-full h-[33%] flex justify-between items-center">
      <div className="text-sm text-white">{item.mode==='send' ? 'To' : 'From'} {item.name},</div>
      <div className="text-sm text-yellow-500 font-bold bg-gray-700 p-2 text-center rounded-xl">{item.category.toUpperCase()}</div>
      <div className={`text-sm font-bold ${item.mode === "send" ? 'text-red-500' : 'text-green-500'}`}>{item.mode==='send' ? '-' : '+'} ₹ {item.amount}</div>
    </div>
    <div className="w-full h-[33%] text-lg text-white py-5">{item.remarks}</div>
    <div className="border-cyan-600 w-full h-[33%] flex justify-between">
      <div className="flex gap-5">
        <div className='w-10 h-10 grid place-content-center hover:scale-125 duration-200 ease-in-out' onClick={handleDelete}>{deleteIcon}</div>
        <div className='w-10 h-10 grid place-content-center hover:scale-125 duration-200 ease-in-out' onClick={handleUpdate}>{item.checked ? checkedIcon :uncheckedIcon}</div>
      </div>
      <div className='"text-sm text-white'>@{item.timestamp}</div>
    </div>
  </div>
  </>)
}

function FinanceForm(props){
  let [formData,setformData] = useState({name:"",mode:"send",category:"food",amount:"",remarks:"",checked:false})
  let render = props.render
  function handleSubmit(){
    let options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    };
    let timestamp = new Intl.DateTimeFormat("en-in", options).format(new Date());
    formData.id = Math.random()*100000 + 100
    formData.timestamp = timestamp
    POST('/api/finance/add',formData)
    setformData({name:"",mode:"send",category:"food",amount:"",remarks:"",checked:false})
    alert("ADDED AN ITEM!")
    render()
  }
  return(<>
  <div className='grid grid-cols-2 gap-y-5 m-5 '>
    <label htmlFor="name" className='text-white text-sm m-1'>Name: </label>
    <input type="text" value={formData.name} className="bg-inherit border-cyan-600 border-2 rounded-sm p-1 text-cyan-700" onChange={(e)=>{setformData({...formData,name:e.target.value})}}/>

    <label htmlFor="mode" className='text-white text-sm m-1'>Mode: </label>
    <select name="mode" value={formData.mode} className="bg-inherit border-cyan-600 border-2 rounded-sm p-1 text-cyan-700" id="" onChange={(e)=>{setformData({...formData,mode:e.target.value})}}>
      <option value="send" className="bg-black border-cyan-600 border-2 rounded-sm p-1 text-cyan-700">Send</option>
      <option value="receive" className="bg-black border-cyan-600 border-2 rounded-sm p-1 text-cyan-700">Receive</option>
    </select>

    <label htmlFor="category" className='text-white text-sm m-1'>Category: </label>
    <select name="category" value={formData.category} className="bg-inherit border-cyan-600 border-2 rounded-sm p-1 text-cyan-700" id="" onChange={(e)=>{setformData({...formData,category:e.target.value})}}>
      <option value="food" className="bg-black border-cyan-600 border-2 rounded-sm p-1 text-cyan-700">Food</option>
      <option value="grooming" className="bg-black border-cyan-600 border-2 rounded-sm p-1 text-cyan-700">Grooming</option>
      <option value="education" className="bg-black border-cyan-600 border-2 rounded-sm p-1 text-cyan-700">Education</option>
      <option value="transport" className="bg-black border-cyan-600 border-2 rounded-sm p-1 text-cyan-700">Transport</option>
    </select>


    <label htmlFor="amount" className='text-white text-sm m-1'>Amount: </label>
    <input type="number" className="bg-black border-cyan-600 border-2 rounded-sm p-1 text-cyan-700" value={formData.amount} onChange={(e)=>{setformData({...formData,amount:e.target.value})}}/>

        
    <label htmlFor="remarks" className='text-white text-sm m-1'>Remarks: </label>
    <input type="text" className="bg-black border-cyan-600 border-2 rounded-sm p-1 text-cyan-700" value={formData.remarks} onChange={(e)=>{setformData({...formData,remarks:e.target.value})}}/>

    <div onClick={handleSubmit} className='
    m-5 p-5 w-fit rounded-xl
    border-cyan-500 border-2 text-cyan-500 cursor-pointer
    hover:scale-125 duration-200 hover:bg-cyan-400 hover:text-black
    '>Submit</div>

  </div>
  </>)
}