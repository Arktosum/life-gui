import React, { useEffect, useState } from 'react'
import { GET, POST } from './Utils'

let addBtnSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
let deleteBtnSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

let checkedSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
</svg>

let uncheckedSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

let data = {
  "123912391239" : {
    "start" : 21321312313,
    "end" : 213213123,
    "completed" : false,
    "labels" : ["today"]
  }
}

export default function Todolist(props) {
  let {render,rerender} = props.props
  let [selectedList,setselectedList] = useState("today");
  return (<>
  <div className="h-[90vh] bg-[#0f0f0f] flex overflow-hidden">
    <div className="w-[20%] h-full bg-[#131313] ">
      <div className="bg-green-600  cursor-pointer hover:bg-green-300 text-black p-5 uppercase">Add Item</div>
      <div className='grid grid-cols-2 gap-x-10 p-5 h-[50%]'>
        <div className="text-white cursor-pointer hover:bg-slate-600 duration-200" onClick={(e)=>{setselectedList('today')}}>Today</div>
        <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        <div className="text-white cursor-pointer hover:bg-slate-600 duration-200" onClick={(e)=>{setselectedList('daily')}}>Daily</div>
        <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        <div className="text-white cursor-pointer hover:bg-slate-600 duration-200" onClick={(e)=>{setselectedList('upcoming')}}>Upcoming</div>
        <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        <div className="text-white cursor-pointer hover:bg-slate-600 duration-200" onClick={(e)=>{setselectedList('completed')}}>Completed</div>
        <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        <div className="text-white cursor-pointer hover:bg-slate-600 duration-200" onClick={(e)=>{setselectedList('important')}}>Important</div>
        <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        <div className="text-white cursor-pointer hover:bg-slate-600 duration-200" onClick={(e)=>{setselectedList('overdue')}}>Overdue</div>
        <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
      </div>
    
    </div>
    <div className="w-[80%] h-full p-5">
      <div className='text-white text-5xl'>{selectedList.toLocaleUpperCase()} , <span className="text-white text-2xl">{new Date().toLocaleString('us',{
        "dateStyle" :"full"
      })}</span></div>
      <br />
      <hr />
      <div className='flex flex-col p-5 overflow-y-scroll max-h-full'>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
      </div>
  
    </div>
  </div>
  </>)
}



function TodoItem(){
  return (<>
  <div className='flex flex-col p-2'>
    <div className='flex gap-5 items-center'>
      <div><input type="radio" /></div>
      <div className='text-white text-xl font-bold'>Title</div>
    </div>
    <div className='text-white'>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci veritatis, nihil dolores inventore reiciendis possimus, nam labore rerum explicabo asperiores laboriosam vel reprehenderit deserunt voluptates minima soluta? Animi, iure aperiam?
    </div>
    <div className="flex justify-evenly px-5">
      <div className="text-white"> From: {new Date().toLocaleString()}</div>
      <div className='text-white'> To {new Date().toLocaleString()}</div>
    </div>
  </div>
  <br/><hr className='bg-gray-600'/>
  </>)
}