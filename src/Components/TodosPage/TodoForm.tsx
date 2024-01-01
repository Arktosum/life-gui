import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createTodo, editTodo, initialFormState } from "../../features/todoSlice";

export default function TodoForm({setModal,formState,setformState} : any){
    const dispatch = useAppDispatch();
    
    const [TodoItem , setTodoItem] = useState(formState.data);
  
    function handleSubmit(e: { preventDefault: () => void; }){
      e.preventDefault();
      if(formState.mode == "create"){dispatch(createTodo(TodoItem));}
      else if(formState.mode == "edit"){dispatch(editTodo(TodoItem));}
      onCancel();
    }
    function onCancel(){
      setformState({
        mode : "create",
        data : initialFormState
      });
      setModal(false);
    }
    
    return (
      <form onSubmit={handleSubmit} className='flex justify-center'>
        <input
          type="text"
          value={TodoItem.title}
          onChange={(e) => setTodoItem({ ...TodoItem, title: e.target.value })}
          required
        />
        <input
          type="text"
          value={TodoItem.description}
          onChange={(e) => setTodoItem({ ...TodoItem, description: e.target.value })}
        />
        <select
          value={TodoItem.priority}
          onChange={(e) => setTodoItem({ ...TodoItem, priority: e.target.value})}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <input
          type="datetime-local"
          value={new Date(TodoItem.dueDate).toISOString().replace("Z","")}
          onChange={(e) => setTodoItem({ ...TodoItem, dueDate: new Date(e.target.value)})}
        />
        <button type="submit" className='px-5 py-2 border-2 border-green-600 text-green-600 '>Save</button>
        <button type="button" className='px-5 py-2 border-2 border-red-600 text-red-600 ' onClick={onCancel}>Cancel</button>
      </form>
    );
  };
  