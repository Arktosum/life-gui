import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createFinance, editFinance } from "../../features/financeSlice";
import { initialFormState } from "../../features/financeSlice";

export default function FinanceForm({setModal,formState,setformState} : any){
    const dispatch = useAppDispatch();
    
    const [FinanceItem , setTodoItem] = useState(formState.data);
  
    function handleSubmit(e: { preventDefault: () => void; }){
      e.preventDefault();

      if(formState.mode == "create"){dispatch(createFinance(FinanceItem));}
      else if(formState.mode == "edit"){dispatch(editFinance(FinanceItem));}
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
      <input type="text" name="transactee" value={FinanceItem.transactee} id="" onChange={(e) => setTodoItem({ ...FinanceItem, transactee: e.target.value })}/>
      <input type="number" name="amount" value={FinanceItem.amount} id="" onChange={(e) => setTodoItem({ ...FinanceItem, amount: Number(e.target.value) })}/>
      <input type="text" name="description" value={FinanceItem.description} id="" onChange={(e) => setTodoItem({ ...FinanceItem, description: e.target.value })}/>
      <select name="mode" id="" value={FinanceItem.mode} onChange={(e) => setTodoItem({ ...FinanceItem, mode: e.target.value })}>
        <option value="SEND">SEND</option>
        <option value="RECEIVE">RECEIVE</option>
      </select>
      <select name="category" id="" value={FinanceItem.category} onChange={(e) => setTodoItem({ ...FinanceItem, category: e.target.value })}>
        <option value="FOOD">FOOD</option>
        <option value="TRANSPORT">TRANSPORT</option>
        <option value="OTHER">OTHER</option>
        <option value="EDUCATION">EDUCATION</option>
        <option value="GROOMING">GROOMING</option>
      </select>
        <button type="submit" className='px-5 py-2 border-2 border-green-600 text-green-600 '>Save</button>
        <button type="button" className='px-5 py-2 border-2 border-red-600 text-red-600 ' onClick={onCancel}>Cancel</button>
      </form>
    );
  };
  
