import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../Navbar'
import femalePlaceholder from '../../assets/female_placeholder.jpg'
import malePlaceholder from '../../assets/male_placeholder.jpg'
import otherPlaceholder from '../../assets/other_placeholder.jpg'

const EDIT_PENCIL = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-[100px] h-[100px] p-7">
<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>



function FriendsComponent() {
  return (
    <div className="h-screen bg-white flex">
      <div id="side-nav" className="w-1/4 bg-[#121212]"></div>
      <div className='flex flex-col w-full'>
        <div className="h-[10%]"><Navbar page="friends"/></div>
        <div id="content" className="h-[90%] bg-black">

          <FormComponent/>
        </div>
      </div>
    </div>
  )
}


function FormComponent(){
  const intialState = {
    name : "",
    phoneNumber : "",
    dateOfBirth : "",
    description : "",
    displayImage : "",
    story : "",
    gender : "OTHER",
  }
  const [formData,setformData] = useState(intialState)
  function handleSubmit(){
    console.log(formData);
    setformData(intialState);
  }
  async function handlefileUpload(e:any){
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setformData(prev=>{return{...prev,displayImage : base64 as string}})

  }
  function handleChange(e : any){
    setformData(prev=>{return {...prev,[e.target.name] : e.target.value}})
  }
  let genderImgMapping : Record<string,string> = {
    'MALE' : malePlaceholder,
    "FEMALE" : femalePlaceholder,
    "OTHER" : otherPlaceholder,
  }

  return (<div className='flex flex-col'>
    
    <label htmlFor="displayImage" className='cursor-pointer relative w-[100px] h-[100px]'>
      <img width="100" height="100" className='top-0 left-0 absolute' src={formData.displayImage || genderImgMapping[formData.gender]} alt="" />
      <div className='duration-200 top-0 left-0 absolute w-[100px] h-[100px] opacity-0 hover:opacity-100 hover:bg-[#0000005b] text-white'>{EDIT_PENCIL}</div>
      
    </label>
    <input type="file" className="hidden" id="displayImage" onChange={handlefileUpload}/>

    <input type="text" name="name" value={formData.name} id="" onChange={handleChange}/>
    <input type="number" name="phoneNumber" value={formData.phoneNumber} id="" onChange={handleChange}/>
    <input type="text" name="description" value={formData.description} id="" onChange={handleChange}/>
    <select name="gender" id="" value={formData.gender} onChange={handleChange}>
      <option value="OTHER">OTHER</option>
      <option value="MALE">MALE</option>
      <option value="FEMALE">FEMALE</option>
    </select>
    
    <textarea name="story" id="" cols={30} rows={10}  value ={formData.story} onChange={handleChange}></textarea>
    <input type="datetime-local" name="dateOfBirth" value={formData.dateOfBirth} id="" onChange={handleChange}/>
    <button  onClick={handleSubmit} className='bg-gray-600 border-green-600'>Add Item</button>
  </div>)
}

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

FriendsComponent.propTypes = {}

export default FriendsComponent
