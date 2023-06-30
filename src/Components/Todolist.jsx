import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {createTodo,deleteTodo,readTodo, updateTodo} from './features/Todo';
import { addBtnSVG, checkedSVG, deleteBtnSVG } from '../assets/icons';

export default function Todolist(props) {
  let {render,rerender} = props.props
  let [modal,setModal] = useState(false)
  let [selectedList,setselectedList] = useState("today");
  let dispatch = useDispatch()
  const todos = useSelector((store)=>store.todo.todos) // Reading
  
  useEffect(()=>{
    dispatch(readTodo());
  },[todos])

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
    dispatch(updateTodo({
      filter: {_id : item._id},
      data : {completed: !item.completed}
    }))
  
  }
  async function deleteItem(){
    dispatch(deleteTodo({_id : item._id}))
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
    dispatch(createTodo(formData));
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
          <div>
            <select className="text-black" name="" id="" onChange={()=>setFormData({...formData,lables:[...formData.labels,e.target.value]})}>
              <option value="today">Today</option>
              <option value="daily">Daily</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="important">Important</option>
              <option value="overdue">Overdue</option>
            </select>
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