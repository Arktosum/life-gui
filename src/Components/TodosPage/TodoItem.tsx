import { useAppDispatch } from "../../app/hooks";
import { deleteTodo, Todo, editTodo } from "../../features/todoSlice";

let editIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-150 hover:stroke-yellow-300 duration-200">
<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

let deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-150 hover:stroke-red-300 duration-200">
<path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>



let tickIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-6 h-6 stroke-green-500 hover:scale-150 hover:stroke-green-300 duration-200'>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>

let crossIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-6 h-6 stroke-red-500 hover:scale-150 hover:stroke-red-300 duration-200'>
<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

export default function TodoItem({item : item , setformState,setModal} : any){
    let todo = item
    const dispatch = useAppDispatch();
  
    const handleDelete = () => {
      let choice :string | null = prompt("Are you sure you want to delete? y/n");
      if(choice?.toLowerCase() === 'y'){
        dispatch(deleteTodo(todo._id!));
      }

      
    };

    const handleToggleStatus = () => {
      const updatedTodo: Todo = { ...todo, status: todo.status === 'PENDING' ? 'COMPLETED' : 'PENDING' };
      dispatch(editTodo(updatedTodo));
    };
  
    function handleEdit(){
      setformState({
        mode : "edit",
        data : todo
      })
      setModal(true);
    }
    return (
      <div className={`w-[50%] p-5 h-auto text-white border-b-white border-b-2`}>
        <div className="flex justify-between">
          <h3 className='font-bold'>{todo.title}</h3>
          <p className="p-2 bg-[#131313] rounded-xl text-yellow-300 font-bold w-[20%] text-center"> {todo.priority}</p>
        </div>
        <p className='text-gray-500'>{todo.description}</p>
        <p>🎯 {new Date(todo.dueDate).toISOString().replace("T"," | ").split(".")[0]}</p>
        <div className='flex justify-around'>
          <button onClick={handleToggleStatus} className="">{todo.status == 'PENDING' ? tickIcon : crossIcon}</button>
          <button onClick={handleEdit}>{editIcon}</button>
          <button onClick={handleDelete}>{deleteIcon}</button>
        </div>
      </div>
     
    );
  }

