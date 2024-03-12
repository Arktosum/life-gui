import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { loginUser } from "../features/authSlice";
import brandLogo from "../assets/brand-logo.svg";
import { Bounce, ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const toastOptions : ToastOptions<unknown> | undefined = {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
}
interface FormData {
  username: string;
  password: string;
}
function Login() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value.trim() };
    });
  }
  async function handleSubmit() {
    const res = await dispatch(loginUser(formData));
    if(res.meta.requestStatus == 'fulfilled'){
      toast.success('Login Successful!',toastOptions);
      navigate('/');
    }
    if(res.meta.requestStatus == 'rejected'){
      toast.error("Login Unsucessful!", toastOptions);
    }
    
  }
  return (
    <div className="min-h-[100dvh] bg-black grid place-content-center">
      <div className="flex justify-center items-center mb-5">
        <img src={brandLogo} alt="" />
      </div>

      <div className="bg-[#121212] grid grid-cols-2 p-5 rounded-xl gap-5 items-center">
        <label htmlFor="username" className="text-white">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          className="appearance-none bg-black py-2 px-5 text-white"
          onChange={handleChange}
        />
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          className="appearance-none bg-black py-2 px-5 text-white"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="px-5 py-2 rounded-xl text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-black duration-200 ease-in-out hover:scale-105 col-span-2"
        >
          LOGIN
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
