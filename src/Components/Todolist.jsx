import React, { useEffect, useState } from 'react'
import { GET,POST } from './Utils'

export default function Todolist(props) {
  let [todoItems, settodoItems] = useState([])
  let [text,setText] = useState('')
  let {rerender,renderState} = props.props
  useEffect(()=>{
    GET('/api/todos/read',(data)=>{
        settodoItems(data)
    })
  },[])
  function handleAdd(){
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
    let data = {
        timestamp: timestamp,
        text : text,
        checked : false
    }
    POST('/api/todos/add',data)
    rerender()
  }

  let items = todoItems.map((item)=>{
    return <TodoItem key={item._id} props={item}/>
  })
  return (
    <div className='min-h-screen bg-black flex justify-center items-center'>
        <div className=''>
            <div className="flex gap-5">
                <input type="text" value={text} className='bg-slate-700 text-cyan-500' onChange={(e)=>{
                    setText(e.target.value)
                }}/>
                <button className="
                p-5 border-cyan-600 border-2 rounded-full w-5 h-5 
                text-white flex justify-center items-center
                hover:scale-125 duration-200 hover:bg-cyan-500 hover:text-black
                " onClick={handleAdd}>Add</button>
            </div>
            <div className="flex flex-col">
                {items}
            </div>
        </div>
    </div>
  )
}

function TodoItem(props){
    let item = props.props
    return (<>
    <div className='flex justify-between items-center gap-5'>
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        <div className='text-white text-xl'>{item.text}</div>
        <div className='text-white text-xl rounded-full bg-red-600 p-5 m-2'></div>
        <div className='text-white text-xl rounded-full bg-red-600 p-5'></div>
    </div>
    
    </>)
}