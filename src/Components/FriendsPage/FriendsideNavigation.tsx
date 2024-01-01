
import { Link } from 'react-router-dom';
import brandLogo from '../../assets/lifegui-logo.svg'

export default function FriendsideNavigation({setModal} : any){
    return (
    <div className='h-full'>
      <div className="h-[10%] grid place-content-center ">
        <Link to="/"><img width="100px" height="100px" src={brandLogo} alt=""/></Link>
      </div>
      <div className="h-auto">
        <button className="px-5 py-2 border-2 border-cyan-600 text-cyan-600 " onClick={()=>{
          setModal(true);
        }}>Add Item</button>
  
        <select name="sortBy" id="">
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
  
        <select name="filterBy" id="">
          <option value="title">Title</option>
          <option value="description">Descending</option>
        </select>
        <input type="text" name="search"/>
      </div>
    </div>
    )
  }