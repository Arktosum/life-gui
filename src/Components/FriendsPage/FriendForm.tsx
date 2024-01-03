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
      <form onSubmit={handleSubmit} className='flex justify-center bg-[#1b1b1b] p-5 gap-5 rounded-xl items-center'>
       <div className='flex flex-col gap-5 justify-center'>
       <label htmlFor="displayImage" className='cursor-pointer relative w-[200px] h-[200px] self-center'>
        <img width="200px" height="200px" className='top-0 left-0 absolute rounded-full' src={FriendItem.displayImage || genderImgMapping[FriendItem.gender]} alt="" />
        <div className='rounded-full duration-200 top-0 left-0 absolute w-[200px] h-[200px] opacity-0 hover:opacity-100 hover:bg-[#0000005b] text-white grid place-items-center'>{EDIT_PENCIL}</div>
      </label>
        <input type="file" className="hidden" id="displayImage" onChange={handlefileUpload} />
        <input type="text" className="bg-inherit border-2 border-gray-600 px-5 py-2 rounded-xl text-white" name="name" value={FriendItem.name} id="" onChange={handleChange}/>
        <select name="gender" className="bg-[#000000] border-2 border-gray-600 px-5 py-2 rounded-xl text-white" id="" value={FriendItem.gender} onChange={handleChange}>
          <option value="OTHER" className="bg-[#000000]">OTHER</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        
        <input
          className="bg-inherit border-2 border-gray-600 p-5 rounded-xl text-white"
          type="datetime-local"
          value={new Date(FriendItem.dateOfBirth).toISOString().replace("Z","")}
          onChange={(e) => {setFriendItem((prev)=>{return {...prev,dateOfBirth :  new Date(e.target.value + "Z") }})}}
          />
        <input type="text" className="bg-inherit border-[1px] border-gray-600 px-5 py-2 rounded-xl text-white" name="phoneNumber" value={FriendItem.phoneNumber} id="" onChange={handleChange} placeholder="Phone number"/>
        <input type="text" className="bg-inherit border-[1px] border-gray-600 px-5 py-2 rounded-xl text-white" name="description" value={FriendItem.description} id="" onChange={handleChange} placeholder="Description"/>
        
        <div className="flex justify-evenly">
          <button type="submit" className='px-10 py-2 border-[1px] border-green-600 text-green-600 rounded-xl hover:bg-green-600 hover:text-black duration-200 ease-in-out hover:scale-105'>Save</button>
          <button type="button" className='px-10 py-2 border-[1px] border-red-600 text-red-600 rounded-xl hover:bg-red-600 hover:text-black duration-200 ease-in-out hover:scale-105' onClick={onCancel}>Cancel</button>
        </div>
        </div>
        <div className="border-[1px] border-[#515151] h-full"></div>
        <textarea name="story" className="bg-inherit border-[1px] border-gray-600 px-5 py-2 rounded-xl text-white w-full h-full" id="" cols={100} rows={10}  value ={FriendItem.story} onChange={handleChange} placeholder="What to write..."></textarea>
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
