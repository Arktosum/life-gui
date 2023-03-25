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


export default function Todolist(props) {
  let {render,rerender} = props.props
  let [TodoName,setTodoName] = useState("")
  let [TodoItems,setTodoItems] = useState([])
  useEffect(()=>{
    POST('/api/todos/read',{},(data)=>{
      data.sort((a,b)=>a.checked - b.checked)
      setTodoItems(data)
    })
  },[render])
  function addTodo(){
    if(TodoName == "") return
    
    let todoitem = {
      checked :false,
      text : TodoName
    }
    POST('/api/todos/create',todoitem,(success)=>{
      if(success)rerender()
    })
    setTodoName("")
  }
  
  let todoitems = TodoItems.map((item)=>{
    
    return <TodoItem key={item._id} props={{item,rerender}}/>
  })
  return (<>
  <div className="h-[90vh] bg-[#0f0f0f]">
    <div className="flex justify-center items-center flex-col">
      <div className='text-white text-xl my-5 font-extrabold p-5'>Todolist - What are we doing today?</div>
      <div className="m-5 flex items-center gap-5">
        <input type="text" className="rounded-xl p-2 bg-inherit focus:outline-none border-cyan-600 border-2 text-white"
        value={TodoName} onChange={(e)=>{setTodoName(e.target.value)}}/>
        <button onClick={()=>{addTodo()}} className='cursor-pointer hover:scale-125 duration-200'>{addBtnSVG}</button>
      </div>
      <div className='flex my-5 flex-col gap-5'>
        {todoitems}
      </div>
    </div>
  </div>
  </>)
}
function TodoItem(props){
  let {item,rerender} = props.props;
  function updateTodo(){
    POST('/api/todos/update',{filter:{_id: item._id},data:{checked:!item.checked}},(success)=>{
      rerender();
    })
    
  }
  function deleteTodo(){
    POST('/api/todos/delete',item,(success)=>{
      rerender();
    })
  }
  return (<>
  <div className='flex items-center gap-5'>
    <div className='w-1 h-1 bg-blue-600 rounded-full '></div>
    <div className={`text-sm ${item.checked ? 'text-[#605f5f] line-through':'text-white'} w-[50vw]`}>{item.text}</div>
    <div className='w-8 h-8 grid place-content-center cursor-pointer hover:scale-125 duration-200' onClick={()=>{updateTodo()}}>{item.checked? checkedSVG : uncheckedSVG}</div>
    <div className='w-8 h-8 grid place-content-center cursor-pointer hover:scale-125 duration-200' onClick={()=>{deleteTodo()}}>{deleteBtnSVG}</div>
  </div>
  </>)
}