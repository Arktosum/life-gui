import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useEffect, useState } from "react";
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
      <div className="flex items-center gap-5 m-5 justify-center">
        <img src="brand-logo-full.svg" alt="" className="w-[50%]" />
      </div>
      <div className="grid place-content-center min-h-[50vh]">
        <LoginContent />
      </div>
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
  function handleSubmit() {
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
      <div className="text-white text-3xl font-bold text-center w-full">
        Login
      </div>
      <div className="text-white grid grid-cols-1 place-items-center gap-5">
        <div>
          <div>Email</div>
          <input
            type="email"
            name="email"
            className="text-white bg-gray-600 px-5 py-2"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Password</div>
          <input
            type="password"
            name="password"
            className="text-white bg-gray-600 px-5 py-2"
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
      </div>
    </>
  );
}
