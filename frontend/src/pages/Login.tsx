import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useEffect, useState } from "react";
import { loginUser, setAuthUser } from "../redux/reducers/authReducer";

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

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function handleSubmit() {
    dispatch(loginUser(form)).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        navigate("/dashboard");
        setForm({
          email: "",
          password: "",
        });
      } else {
        console.error(action.meta.rejectedWithValue);
      }
    });
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  return (
    <PageContainer>
      <div className="flex items-center gap-5 m-5 justify-center">
        <img src="brand-logo-full.svg" alt="" className="w-[50%]" />
      </div>
      <div className="text-white text-xl font-bold">Login</div>
      <div className="text-white flex gap-5">
        <div>Email</div>
        <input
          type="email"
          name="email"
          className="text-black"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="text-white flex gap-5">
        <div>Password</div>
        <input
          type="password"
          name="password"
          className="text-black"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <button
        className="px-5 py-2 text-white bg-green-600"
        onClick={handleSubmit}
      >
        LOGIN
      </button>
      <div className="text-white">
        Do not have an account? <span className="text-red-500">Too bad!</span>
      </div>
    </PageContainer>
  );
}
