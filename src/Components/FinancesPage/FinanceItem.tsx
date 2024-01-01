import { useAppDispatch } from "../../app/hooks";
import { Finance, deleteFinance, editFinance } from "../../features/financeSlice";


export default function FinanceItem({item : item , setformState,setModal} : any){
    let finance : Finance= item
    const dispatch = useAppDispatch();
  
    const handleDelete = () => {
      dispatch(deleteFinance(finance._id!));
    };
  
    const handleToggleStatus = () => {
      const updatedTodo: Finance = { ...finance, status: finance.status === 'UNPAID' ? 'PAID' : 'UNPAID' };
      dispatch(editFinance(updatedTodo));
    };
  
    function handleEdit(){
      setformState({
        mode : "edit",
        data : finance
      })
      setModal(true);
    }
    return (
      <div className='w-full p-5 h-auto text-white border-green-600 border-2'>
        <h3 className='font-bold'>{finance.transactee}</h3>
        <p className='text-gray-500'>{finance.description}</p>
        <p>{finance.amount.toString()}</p>
        <p>Status: {finance.status}</p>
        <p>Mode: {finance.mode}</p>
        <p>Category: {finance.category}</p>
        <div className='flex justify-evenly'>
          <button onClick={handleToggleStatus}>Toggle</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    );
  }
  