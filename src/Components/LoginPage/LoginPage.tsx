import  { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector} from '../../app/hooks'
import { loginUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import brandLogo from '../../assets/lifegui-logo.svg'
function LoginPage() {
  let initialState = {
    username : "",
    password : "",
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let [formData,setFormData] = useState(initialState)
  async function handleSubmit(e: { preventDefault: () => void }){
    e.preventDefault()
    let response = await dispatch(loginUser(formData));
    if(response.meta.requestStatus == "fulfilled"){
      navigate('/todos');
    }
    if(response.meta.requestStatus == "rejected"){
      console.log("Rejected!");
    }
    setFormData(initialState);
  }
  function handleInput(e: { target: { name: any; value: any } }){
    setFormData(prev=>{return {...prev,[e.target.name] : e.target.value}})
  }
  return (
    <div className="bg-black h-screen grid place-content-center">
      <form className='bg-[#0d0d0d] flex flex-col gap-5 p-10 rounded-xl' onSubmit={handleSubmit}>
        <div className='grid place-content-center'><img src={brandLogo} alt="" /></div>
        <label htmlFor="username" className='text-white font-bold flex gap-5 items-center justify-center'>
          Username
          <input 
          className='bg-inherit border-[1px] border-gray-600 px-5 py-2 rounded-xl text-white'
           value={formData.username} type="text" name="username" required onChange={handleInput} />
        </label>
        <label htmlFor="password" className='text-white font-bold flex gap-5 items-center justify-center'>
          Password
          <input 
          className='bg-inherit border-[1px] border-gray-600 px-5 py-2 rounded-xl text-white'
          value={formData.password}  type="password" name="password" required onChange={handleInput}/>
        </label>
        <button type="submit" className='px-10 py-2 border-[1px] border-green-600 text-green-600 rounded-xl hover:bg-green-600 hover:text-black duration-200 ease-in-out hover:scale-105'>Login</button>
      </form>
    </div>
  )
}


export default LoginPage
