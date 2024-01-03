import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Navbar from '../Navbar';
import { Friend, fetchFriends, initialFormState } from '../../features/friendSlice';
import FriendItem from './FriendItem';
import FriendForm from './FriendForm';
import FriendsideNavigation from './FriendsideNavigation';


export default function FriendsPage() {
  const friends : Friend[] = useAppSelector(state=>state.friend.friends);
  const dispatch = useAppDispatch();
  
  const [modal,setModal] = useState(false);
  const [formState,setformState] = useState({
    mode : "create",
    data : initialFormState
  })
  useEffect(()=>{
    dispatch(fetchFriends());
  },[dispatch])

  let friendElements = friends.map((item)=>{
    return (<FriendItem key={item._id} item={item}  setModal={setModal} setformState={setformState}/>)
  })

  return (  
    <div className="h-screen bg-white flex">
      {modal ?
      <div className="w-screen h-screen fixed bg-[#000000ad] grid place-content-center z-10">
          <FriendForm setModal={setModal} formState={formState} setformState={setformState} /> 
      </div>:<></>
      }
      <div id="side-nav" className="w-1/4 bg-[#121212]">
        <FriendsideNavigation setModal={setModal}/>
      </div>
      <div className='flex flex-col w-full'>
        <div className="h-[10%]"><Navbar page="friends"/></div>
        <div id="content" className="h-[90%] bg-black overflow-y-scroll p-5 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {friendElements}
        </div>
      </div>
    </div>
  )
}


