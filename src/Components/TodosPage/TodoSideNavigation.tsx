
import { Link } from 'react-router-dom';
import brandLogo from '../../assets/lifegui-logo.svg'
import { useAppDispatch } from '../../app/hooks';
import { setFilter, setOrder } from '../../features/todoSlice';

export default function TodosideNavigation({setModal} : any){
    let dispatch = useAppDispatch();
    return (
    <div className='h-full'>
      <div className="h-[10%] grid place-content-center ">
        <Link to="/"><img width="100px" height="100px" src={brandLogo} alt=""/></Link>
      </div>
      <div className="h-auto">
        <button className="px-5 py-2 border-2 border-cyan-600 text-cyan-600 " onClick={()=>{
          setModal(true);
        }}>Add Item</button>
  
        <select name="sortBy" id="" onChange={(e)=>{
          dispatch(setOrder(e.target.value));
        }}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
  
        <select name="filterBy" id="" onChange={(e)=>{
          dispatch(setFilter(e.target.value));
        }}>
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="dueDate">Date</option>
          <option value="priority">Priority</option>
        </select>
        <input type="text" name="search"/>
      </div>
    </div>
    )
  }