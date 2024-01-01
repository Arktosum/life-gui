import { useAppDispatch } from "../../app/hooks";
import { Friend, deleteFriend } from "../../features/friendSlice";
import femalePlaceholder from '../../assets/female_placeholder.jpg'
import malePlaceholder from '../../assets/male_placeholder.jpg'
import otherPlaceholder from '../../assets/other_placeholder.jpg'
import maleSymbol from '../../assets/male_symbol.png'
import femaleSymbol from '../../assets/female_symbol.png'
import otherSymbol from '../../assets/other_symbol.png'
import moment from "moment";


export default function FriendItem({item : item , setformState,setModal} : any){
    let friend : Friend= item
    const dispatch = useAppDispatch();
  
    const handleDelete = () => {
      let choice :string | null = prompt("Are you sure you want to delete? y/n");
      if(choice?.toLowerCase() === 'y'){
        dispatch(deleteFriend(friend._id!));
      }
    };

    function handleEdit(){
      setformState({
        mode : "edit",
        data : friend
      })
      setModal(true);
    }
    let genderImgMapping : Record<string,Record<string,string>>= {
      'MALE' : {image : malePlaceholder,icon : maleSymbol},
      "FEMALE" : {image : femalePlaceholder,icon : femaleSymbol},
      "OTHER" : {image : otherPlaceholder,icon : otherSymbol},
    }

    
    return (
      <div className='border-gray-500 border-2 text-white rounded-xl'>
        <div className='w-[300px]'> 
          <img  className="rounded-b-none rounded-xl object-cover h-[300px]" width="300px" height="300px" src={friend.displayImage || genderImgMapping[friend.gender].image} alt="" />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h3 className='font-bold'>{friend.name}</h3>
            <img  className="rounded-b-none rounded-xl" width="30px" height="30px" src={genderImgMapping[friend.gender].icon} alt="" />
          </div>
          <p>{friend.description}</p>
          <p className='text-gray-500'>🎂 {friend.dateOfBirth.toString().split("T")[0]}</p>
          <p className='text-gray-500'>🎂 {moment().diff(friend.dateOfBirth.toString().split("T")[0],'years',false)} years old.</p>
          <p>{friend.phoneNumber}</p>
        {/* <div className="text-ellipsis overflow-hidden whitespace-nowrap">{friend.story}</div> */}
        </div>
        <div className='flex justify-evenly text-white'>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    );
  }
  