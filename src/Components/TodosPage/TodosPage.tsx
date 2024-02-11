import { useEffect, useState } from 'react'

import { fetchTodos,initialFormState,Todo} from '../../features/todoSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Navbar from '../Navbar';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodosideNavigation from './TodoSideNavigation';

function TodosComponent() {
  const todos : Todo[] = useAppSelector(state=>state.todo.todos);
  const dispatch = useAppDispatch();
  const [modal,setModal] = useState(false);
  const [formState,setformState] = useState({
    mode : "create",
    data : initialFormState
  })
  useEffect(()=>{
    dispatch(fetchTodos());
  },[dispatch])

  let todoElements = todos.map((item)=>{
    return (<TodoItem key={item._id} item={item}  setModal={setModal} setformState={setformState}/>)
  })
  return (  
    <div className="h-screen bg-white flex">
      {modal ?
      <div className="w-screen h-screen fixed bg-[#0000007e] grid place-content-center">
          <TodoForm setModal={setModal} formState={formState} setformState={setformState} /> 
      </div>:<></>
      }
      <div id="side-nav" className="w-1/4 bg-[#121212]">
        <TodosideNavigation setModal={setModal}/>
      </div>
      <div className='flex flex-col w-full'>
        <div className="h-[10%]"><Navbar page="todos"/></div>
        <div id="content" className="h-[90%] bg-black overflow-y-scroll flex flex-col items-center gap-10">
          {todoElements}
        </div>
      </div>
    </div>
  )
}

export default TodosComponent
