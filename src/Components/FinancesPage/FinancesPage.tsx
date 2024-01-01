import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Navbar from '../Navbar';
import { Finance, fetchFinances, initialFormState } from '../../features/financeSlice';
import FinanceForm from './FinanceForm';
import FinanceItem from './FinanceItem';
import FinancesideNavigation from './FinancesideNavigation';

function FinancesComponent() {
  const finances : Finance[] = useAppSelector(state=>state.finance.finances);
  const dispatch = useAppDispatch();
  
  const [modal,setModal] = useState(false);
  const [formState,setformState] = useState({
    mode : "create",
    data : initialFormState
  })
  useEffect(()=>{
    dispatch(fetchFinances());
  },[dispatch])

  let financeElements = finances.map((item)=>{
    return (<FinanceItem key={item._id} item={item}  setModal={setModal} setformState={setformState}/>)
  })
  return (  
    <div className="h-screen bg-white flex">
      {modal ?
      <div className="w-screen h-screen fixed bg-[#0000007e] grid place-content-center">
          <FinanceForm setModal={setModal} formState={formState} setformState={setformState} /> 
      </div>:<></>
      }
      <div id="side-nav" className="w-1/4 bg-[#121212]">
        <FinancesideNavigation setModal={setModal}/>
      </div>
      <div className='flex flex-col w-full'>
        <div className="h-[10%]"><Navbar page="finances"/></div>
        <div id="content" className="h-[90%] bg-black overflow-y-scroll">
          {financeElements}
        </div>
      </div>
    </div>
  )
}

export default FinancesComponent
