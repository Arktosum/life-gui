import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logoutUser } from "../features/userSlice";
import { logoutIcon } from "../app/assets";

export default function Dashboard() {
  return (
    <PageContainer>
      <TopNav />
      <Content />
    </PageContainer>
  );
}

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
function TopNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await dispatch(logoutUser());
    if (response.meta.requestStatus == "fulfilled") navigate("/login");
  }
  return (
    <div className="top-nav w-full h-[10%] flex justify-between p-2 gap-5 bg-[#171717] mb-5">
      <img src={"/logo.svg"} alt="" className="" />
      <button
        className="px-5 py-2 justify-center items-center flex gap-2 text-red-600 rounded-xl"
        onClick={handleLogout}
      >
        {logoutIcon} Logout
      </button>
    </div>
  );
}
function Content() {
  return (
    <div className="w-full flex-1 text-white flex flex-col gap-5">
      <Link to="/finance">
        <div className="bg-[#1c1c1c] p-5 mx-5 rounded-xl font-bold">
          Finances
        </div>
      </Link>
      <Link to="/diary">
        <div className="bg-[#1c1c1c] p-5 mx-5 rounded-xl font-bold">Diary</div>
      </Link>
      <Link to="/todo">
        <div className="bg-[#1c1c1c] p-5 mx-5 rounded-xl font-bold">Todo</div>
      </Link>
      <Link to="/friend">
        <div className="bg-[#1c1c1c] p-5 mx-5 rounded-xl font-bold">
          Hall of Friends
        </div>
      </Link>
    </div>
  );
}
