import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { FormEvent, useEffect, useState } from "react";
import { loginUser, setAuthUser } from "../redux/reducers/authReducer";
import { showToast } from "../utils";

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="w-[100vw] h-[100dvh] flex flex-col bg-black">
      {children}
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch(setAuthUser(JSON.parse(user)));
      navigate("/dashboard");
    }
  }, [dispatch, navigate]);

  return (
    <PageContainer>
      <LoginContent />
    </PageContainer>
  );
}

function LoginContent() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(loginUser(form)).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        showToast("Logged in successfully!", "SUCCESS");
        setTimeout(() => {
          navigate("/dashboard");
          setForm({
            email: "",
            password: "",
          });
        });
      } else {
        console.error(action.meta.rejectedWithValue);
        showToast("Error logging in!", "ERROR");
      }
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img src="/brand-logo-full.svg" className="w-[50%]"></img>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-5 my-10"
        >
          <div className="text-white">
            <BottomInput
              type="email"
              label="Email"
              name="email"
              handleChange={handleChange}
            />
          </div>
          <div className="text-white">
            <BottomInput
              type="password"
              label="Password"
              name="password"
              handleChange={handleChange}
            />
          </div>
          <button className="text-black rounded-xl px-20 py-2 bg-[#4DA500] my-10">
            LOGIN
          </button>
          <div className="text-white">
            Don't have an account?
            <strong className="text-red-600">Too bad!</strong>
          </div>
        </form>
      </div>
    </>
  );
}

interface BottomInputProps {
  label: string;
  name: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BottomInput({ label, name, handleChange, type }: BottomInputProps) {
  return (
    <>
      <label htmlFor="" className="text-[0.7rem] text-[#898686]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="bg-inherit outline-none border-black block border-b-green-600 border-2"
        onChange={handleChange}
      />
    </>
  );
}
