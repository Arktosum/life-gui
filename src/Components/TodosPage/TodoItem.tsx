import { useAppDispatch } from "../../app/hooks";
import { deleteTodo, Todo, editTodo } from "../../features/todoSlice";

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
      <div className='w-full p-5 h-auto text-white border-green-600 border-2'>
        <h3 className='font-bold'>{todo.title}</h3>
        <p className='text-gray-500'>{todo.description}</p>
        <p>{todo.priority}</p>
        <p>Status: {todo.status}</p>
        <p>CreatedAt: {todo.createdAt}</p>
        {todo.dueDate && <p> {new Date(todo.dueDate).toISOString().replace("T"," | ").split(".")[0]}</p>}
        <div className='flex justify-evenly'>
          <button onClick={handleToggleStatus}>Toggle</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    );
  }
  