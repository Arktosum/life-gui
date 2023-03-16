import React, { useEffect, useState } from 'react'
import { POST } from './Utils';


export default function Finance(props) {
  let {render,rerender} = props.props
  let [financeItems,setfinanceItems] = useState([])
  let [balance,setBalance] = useState(0);
  let [showModal,setShowModal] = useState(false);
  useEffect(()=>{
    POST('/api/finances/read',{},(data)=>{
      setfinanceItems(data);
      let balance = 0
      for(let row of data){
        balance += row.amount * (row.completed ? 0 : 1) * (row.mode == 'send' ? -1 : 1);
      }
      setBalance(balance);
    })
  },[render])
  
  
  let financeitems = financeItems.map((item)=>{
    return <FinanceItem key={item._id} props={{item,rerender}}/>
  })
  return (<>
    <div className={`absolute w-full h-full bg-[#00000081] ${showModal? '':'hidden'}`}>
      <FinanceForm props={{rerender,setShowModal}}/>
    </div>
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="p-5 flex gap-5 justify-between">
        <div className="text-white px-4 py-2 border-green-600 border-2 
        inline-block rounded-xl
        hover:bg-green-600 hover:text-black cursor-pointer hover:scale-125 duration-200
        " onClick={()=>{setShowModal(true);}}>Add Item</div>
        <div className={`${balance<0 ? 'text-red-600' : 'text-green-600'} text-sm font-bold`}>Balance: {balance<0 ? '-':'+'}₹ {Math.abs(balance)}</div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
        {financeitems}
      </div>
    </div>
    </>)
}
function FinanceForm(props){
  let {rerender,setShowModal} = props.props
  function addItem(e){
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    data.completed = false
    POST('/api/finances/create',data,(success)=>{
      setShowModal(false);
      rerender()
    })
    e.target.reset();
  }
  let labelStyle = `text-xl text-white text-center italic`
  let inputStyle = "text-cyan-600 rounded-xl py-1 px-2 bg-inherit outline-none ring-2 ring-white hover:ring-[#0c8294] duration-200"
  return(<div className='flex justify-center items-center h-full'>
    <form onSubmit={(e)=>{addItem(e)}} className='bg-gray-800 rounded-xl p-2'>
      <div className='grid grid-cols-2 gap-5 p-5'>
        <label htmlFor="name" className={labelStyle}>Name</label>
        <input type="text" name="name" id="" className={inputStyle} required/>
        <label htmlFor="mode" className={labelStyle}>Mode</label>
        <select name="mode" id=""className={inputStyle}>
          <option value="send" className={inputStyle}>Send</option>
          <option value="receive" className={inputStyle}>Receive</option>
        </select>
        <label htmlFor="amount" className={labelStyle}>Amount</label>
        <input type="number" name="amount" id="" min="1"className={inputStyle} required />
        <label htmlFor="category" className={labelStyle}>Category</label>
        <select name="category" id=""className={inputStyle} >
          <option value="education" className={inputStyle}>Education</option>
          <option value="grooming" className={inputStyle}>Grooming</option>
          <option value="transport" className={inputStyle}>Transport</option>
          <option value="food" className={inputStyle}>Food</option>
        </select>
        <label htmlFor="remarks" className={labelStyle}>Remarks</label>
        <input type="text" name="remarks" id="" className={inputStyle} required/>
        <div className="p-5 inline-block bg-[#ff000061] font-bold hover:bg-[#ff000099]
        rounded-xl uppercase hover:scale-105 duration-200 text-center cursor-pointer" onClick={()=>{setShowModal(false);}}>cancel</div>
        <button className="p-5 inline-block bg-[#5eff0061] font-bold hover:bg-[#5eff0091]
        rounded-xl uppercase hover:scale-105 duration-200 cursor-pointer">submit</button>
      </div>
    </form>
  </div>)
}
let deleteBtnSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

let checkedSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
</svg>

let uncheckedSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

function FinanceItem(props){
  let {item,rerender} = props.props
  let [date,time] = item.createdAt.split("T")
  function deleteItem(){
    let randNum = parseInt(Math.random()*100)
    let choice = prompt(`Enter | ${randNum} | to delete!`)
    if(choice != randNum) return
    POST('/api/finances/delete',item,()=>{
      rerender();
    })
  }
  function updateItem(){
    POST("/api/finances/update",{filter : {_id : item._id},data:{completed:!item.completed}},(success)=>{
      rerender();
    })
  }
  return (<>
  <div className='bg-[#191818] p-5 m-2 rounded-xl text-sm shadow-black shadow-xl 
  hover:scale-105 duration-200 cursor-pointer hover:bg-[#232222]'>
    <div className='flex justify-between py-1'>
      <div className='text-blue-300'>{item.name}</div>
      <div className='uppercase font-bold text-yellow-300 bg-blue-600 px-2 rounded-xl'>{item.category}</div>
      <div className={`${item.mode == 'send' ? 'text-red-600' : 'text-green-600'} font-bold`}>{item.mode=='send' ? '-':'+'}₹ {item.amount}</div>
    </div>
    <div className="text-white py-1">{item.remarks}</div>
    <div className='flex justify-between'>
      <div>{item.completed}</div>
      {/* <div>{date}-{time}</div> */}
    </div>
    <div className='flex justify-between py-2'>
      <div className='hover:scale-125 duration-200' onClick={()=>deleteItem()}>{deleteBtnSVG}</div>
      <div className='hover:scale-125 duration-200' onClick={()=>updateItem()}>{item.completed? checkedSVG : uncheckedSVG}</div>
    </div>
  </div>
  </>)
}