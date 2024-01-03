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


    let friendImage = friend.displayImage || genderImgMapping[friend.gender].image
    let friendIcon = genderImgMapping[friend.gender].icon
    let friendName = friend.name
    let friendDate = friend.dateOfBirth.toString().split("T")[0]
    let friendAge = moment().diff(friend.dateOfBirth.toString().split("T")[0],'years',false)
    let friendDescription = friend.description
    let friendPhoneNumber = friend.phoneNumber
    
    return (
      <div className='border-gray-500 border-2 w-[260px] text-white rounded-xl flex flex-col hover:scale-105 duration-200 ease-in-out cursor-pointer hover:brightness-110 hover:-z-100' onClick={handleEdit}>
        <div className="w-[256px] h-[256px]"><img src={friendImage} alt="" className="rounded-t-xl h-full w-full object-cover"/></div>
        <div className="bg-[#000] rounded-b-lg p-3">
          <div className="flex justify-between">
            <p className="font-bold">{friendName}</p>
            <img width="30px" height="30px" src={friendIcon} alt="" />
          </div>
          <p className="text-sm text-gray-600">🎂 {friendDate} | <span className="font-bold text-green-600">{friendAge}</span> years old.</p>
          {friendPhoneNumber && <p className="text-sm text-gray-600">📞 {friendPhoneNumber} </p>}
          {friendDescription && <p className="py-2 font-bold">💬{friendDescription}</p>}
        </div>
      </div>
    );
  }
  