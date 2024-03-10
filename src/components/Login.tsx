import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../hooks";
import { loginUser } from "../slices/authSlice";

interface FormData{
  username : string;
  password : string;
}
function Login() {
  const [formData,setFormData] = useState<FormData>({username:"",password:""})
  const dispatch = useAppDispatch();
  
  function handleChange(e : ChangeEvent<HTMLInputElement>) {
    setFormData(prev=>{return {...prev,[e.target.name] : e.target.value}})
  }
  function handleSubmit(){
    dispatch(loginUser(formData));
  }
  return (
    <div>
      <input type="text" name="username" value={formData.username} className="border-black border-2" onChange={handleChange}/>
      <input type="password" name="password" value={formData.password} className="border-black border-2" onChange={handleChange}/>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;
