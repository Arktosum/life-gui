import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Friend, createFriend, editFriend, initialFormState } from "../../features/friendSlice";
import femalePlaceholder from '../../assets/female_placeholder.jpg'
import malePlaceholder from '../../assets/male_placeholder.jpg'
import otherPlaceholder from '../../assets/other_placeholder.jpg'

const EDIT_PENCIL = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-[100px] h-[100px]">
<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>


export default function FriendForm({setModal,formState,setformState} : any){
    const dispatch = useAppDispatch();
    
    const [FriendItem , setFriendItem] = useState<Friend>(formState.data);
    async function handlefileUpload(e:any){
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFriendItem(prev=>{return{...prev,displayImage : base64 as string}})
  
    }
    function handleChange(e : any){
      setFriendItem(prev=>{return {...prev,[e.target.name] : e.target.value}})
    }
    let genderImgMapping : Record<string,string> = {
      'MALE' : malePlaceholder,
      "FEMALE" : femalePlaceholder,
      "OTHER" : otherPlaceholder,
    }
  
    function handleSubmit(e: { preventDefault: () => void; }){
      e.preventDefault();
    
      if(formState.mode == "create"){dispatch(createFriend(FriendItem));}
      else if(formState.mode == "edit"){dispatch(editFriend(FriendItem));}
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
      <label htmlFor="displayImage" className='cursor-pointer relative w-[500px] h-[500px]'>
        <img width="500px" height="500px" className='top-0 left-0 absolute ' src={FriendItem.displayImage || genderImgMapping[FriendItem.gender]} alt="" />
        <div className='duration-200 top-0 left-0 absolute w-[500px] h-[500px] opacity-0 hover:opacity-100 hover:bg-[#0000005b] text-white'>{EDIT_PENCIL}</div>
      </label>
      <div className='flex flex-col w-[500px] h-[500px]'>
        <input type="file" className="hidden" id="displayImage" onChange={handlefileUpload}/>
        <input type="text" name="name" value={FriendItem.name} id="" onChange={handleChange}/>
        <select name="gender" id="" value={FriendItem.gender} onChange={handleChange}>
          <option value="OTHER">OTHER</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        <input
            type="datetime-local"
            value={new Date(FriendItem.dateOfBirth).toISOString().replace("Z","")}
            onChange={(e) => {setFriendItem((prev)=>{return {...prev,dateOfBirth :  new Date(e.target.value + "Z") }})}}
          />
        <input type="text" name="phoneNumber" value={FriendItem.phoneNumber} id="" onChange={handleChange}/>
        <input type="text" name="description" value={FriendItem.description} id="" onChange={handleChange}/>
        <textarea name="story" id="" cols={30} rows={10}  value ={FriendItem.story} onChange={handleChange}></textarea>
        <button type="submit" className='px-5 py-2 border-2 border-green-600 text-green-600 '>Save</button>
        <button type="button" className='px-5 py-2 border-2 border-red-600 text-red-600 ' onClick={onCancel}>Cancel</button>
        </div>
      </form>
    );
  };
  


  
function convertToBase64(file: Blob) : Promise<String|ArrayBuffer|null>{
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = () => reject
  })
}
