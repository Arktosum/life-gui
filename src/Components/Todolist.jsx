import React, { useEffect, useState } from 'react'
import { GET, POST } from './Utils'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {createTodo,deleteTodo,readTodo, updateTodo} from './features/Todo';
import { addBtnSVG, checkedSVG } from '../assets/icons';

let deleteBtnSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

let uncheckedSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>

export default function Todolist(props) {
  let {render,rerender} = props.props
  let [modal,setModal] = useState(false)
  let [selectedList,setselectedList] = useState("today");
  let dispatch = useDispatch()

  useEffect(()=>{
    dispatch(readTodo());
  },[dispatch])

  const todos = useSelector((reducers)=>reducers.todo.todos) // Reading
  let todoItems = todos.map((item)=>{
      return <TodoItem key={item._id} props={{item}}></TodoItem>
  })

  return (<>
  {modal ? <TodoModal props={{setModal}}></TodoModal>:<></>}
  <div className="h-[90vh] bg-[#0f0f0f] flex overflow-hidden">
    <div className="w-[20%] h-full bg-[#131313] ">
    <div className="bg-green-600  cursor-pointer hover:bg-green-300 text-black p-5 uppercase flex gap-5" onClick={()=>{
      setModal(prev=>!prev);
    }}>
      {addBtnSVG}
      <div>Add Item</div>
    </div>
    <div className='flex flex-col gap-x-10 p-5 h-[50%]'>
        <div className="text-white cursor-pointer hover:bg-[#262626] duration-200 grid grid-cols-2 gap-x-5 p-2 hover:rounded-lg place-items-center" onClick={(e)=>{setselectedList('today')}}>
          <div>Today</div>
          <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        </div>
        <div className="text-white cursor-pointer hover:bg-[#262626] duration-200 grid grid-cols-2 gap-x-5 p-2 hover:rounded-lg place-items-center" onClick={(e)=>{setselectedList('daily')}}>
          <div>Daily</div>
          <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        </div>
        <div className="text-white cursor-pointer hover:bg-[#262626] duration-200 grid grid-cols-2 gap-x-5 p-2 hover:rounded-lg place-items-center" onClick={(e)=>{setselectedList('upcoming')}}>
          <div>Upcoming</div>
          <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        </div>
        <div className="text-white cursor-pointer hover:bg-[#262626] duration-200 grid grid-cols-2 gap-x-5 p-2 hover:rounded-lg place-items-center" onClick={(e)=>{setselectedList('completed')}}>
          <div>Completed</div>
          <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        </div>
        <div className="text-white cursor-pointer hover:bg-[#262626] duration-200 grid grid-cols-2 gap-x-5 p-2 hover:rounded-lg place-items-center" onClick={(e)=>{setselectedList('important')}}>
          <div>Important</div>
          <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        </div>
        <div className="text-white cursor-pointer hover:bg-[#262626] duration-200 grid grid-cols-2 gap-x-5 p-2 hover:rounded-lg place-items-center" onClick={(e)=>{setselectedList('overdue')}}>
          <div>Overdue</div>
          <span className="text-white w-8 h-8 grid place-items-center bg-yellow-500 rounded-full">1</span>
        </div>
      </div>
    </div>
    <div className="w-[80%] h-full p-5">
      <div className='text-white text-5xl'>{selectedList.toLocaleUpperCase()} , <span className="text-white text-2xl">{new Date().toLocaleString('us',{
        "dateStyle" :"full"
      })}</span></div>
      <br />
      <hr />
      <div className='flex flex-col p-5 overflow-y-scroll max-h-full'>
        {todoItems}
      </div>
  
    </div>
  </div>
  </>)
}

function TodoItem(props){
  let {item} = props.props;
  let dispatch = useDispatch()
  async function updateItem(){
    await dispatch(updateTodo({
      filter: {_id : item._id},
      data : {completed: !item.completed}
    }))
    await dispatch(readTodo())
  }
  async function deleteItem(){
    await dispatch(deleteTodo({_id : item._id}))
    await dispatch(readTodo())
    alert("deleted item!");
  }
  let strikeThrough = `line-through opacity-50`
  return (<>
  <div className={`flex flex-col p-2 bg-[#141414] rounded-xl`}>
    <div className='flex gap-5 items-center'>
      {!item.completed ? <div onClick={updateItem}
      className='w-5 h-5 border-white rounded-full border-2 cursor-pointer hover:bg-slate-500 duration-200'></div> : 
      <div onClick={updateItem} className='cursor-pointer'>{checkedSVG('green')}</div>
      }
      <div className={`text-white text-xl font-bold ${item.completed? strikeThrough : ''}`}>{item.title}</div>
    </div>
    <div className={`text-gray-500 text-sm ${item.completed? strikeThrough : ''}`}>{item.description}</div>
    <div className="flex justify-evenly px-5">
      <div className={`flex  gap-5 text-white ${item.completed? strikeThrough : ''}`}>
        <div>{item.startedAt.split('T')[0]}</div>
        <div>To</div> 
        <div>{item.endedAt.split('T')[0]}</div>
      </div>
    </div>
    <div className="flex justify-end cursor-pointer" onClick={deleteItem}>{deleteBtnSVG}</div>
  </div>
  <br/>
  </>)
}

function TodoModal(props){
  let {setModal} = props.props;
  const INITIAL_DATA = {
    title : "",
    description : "",
    startedAt : new Date().toISOString().split('T')[0],
    endedAt : new Date().toISOString().split('T')[0],
    completed : false,
    labels : []
  }
  let [formData,setFormData] = useState(INITIAL_DATA)
  let dispatch = useDispatch()
  async function addItem(){
    await dispatch(createTodo(formData));
    await  dispatch(readTodo())
    setFormData(INITIAL_DATA);
    setModal(prev=>!prev)
    alert("Added item!");
  }
  return(<>
    <div className='bg-[#0000007f] fixed h-[90vh] w-[100vw] flex justify-center items-center'>
      <div className='text-white bg-[#161616] w-[50vw] rounded-xl p-5'>
        <div className='flex flex-col justify-start gap-y-2'>
          <input type="text" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})}
          className="text-white text-xl bg-inherit w-full p-2 outline-none duration-200 hover:ring-[#1e1e1e] hover:ring-2 rounded-xl" placeholder="Task Name" />
          <input type="text" value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})}
          className="text-gray-500 text-sm bg-inherit w-full p-2 outline-none duration-200 hover:ring-[#1e1e1e] hover:ring-2 rounded-xl" placeholder="Description" />
          <div className="flex gap-5">
            <input type="date" value={formData.startedAt} onChange={(e)=>setFormData({...formData,startedAt:e.target.value})}
            name="from" id="" className='text-white bg-inherit p-1 outline-none duration-200 hover:ring-[#1e1e1e] hover:ring-2 cursor-pointer'/>
            <input type="date" value={formData.endedAt} onChange={(e)=>setFormData({...formData,endedAt:e.target.value})}
            name="to" id="" className='text-white bg-inherit p-1 outline-none duration-200 hover:ring-[#1e1e1e] hover:ring-2 cursor-pointer'/>
          </div>
        </div>
        <hr />
        <div className="flex justify-end gap-x-10 p-2">
          <div className="text-white bg-[#3d3d3d] rounded-xl py-2 px-5 uppercase cursor-pointer hover:bg-[#666666] duration-200" onClick={()=>setModal(prev=>!prev)}>cancel</div>
          <div className="text-white bg-green-600 rounded-xl py-2 px-5 uppercase cursor-pointer hover:bg-[#0b8609] duration-200" onClick={addItem}>add</div>
        </div>
      </div>
    </div>
  </>)
}