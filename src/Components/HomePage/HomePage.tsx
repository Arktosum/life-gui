import  { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

function HomeComponent() {
  let initialState = {
    username : "",
    password : "",
  }
  
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const token = useAppSelector(state=> state.auth.token)
  useEffect(()=>{
    if(token != null){
      navigate('/todos');
    }
  },[token,dispatch])

  let [formData,setFormData] = useState(initialState)
  function handleSubmit(e: { preventDefault: () => void }){
    e.preventDefault()
    dispatch(loginUser(formData));
    setFormData(initialState);
  }
  function handleInput(e: { target: { name: any; value: any } }){
    setFormData(prev=>{return {...prev,[e.target.name] : e.target.value}})
  }
  return (
    <div className="bg-black h-screen grid place-content-center">
      <form className='bg-gray-600 flex flex-col gap-5 p-10' onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username: 
          <input value={formData.username} type="text" name="username" required onChange={handleInput} />
        </label>
        <label htmlFor="password">
          Password: 
          <input value={formData.password}  type="password" name="password" required onChange={handleInput}/>
        </label>
        <button className='px-5 py-2 bg-green-600'>Login</button>
      </form>
    </div>
  )
}

HomeComponent.propTypes = {}

export default HomeComponent
