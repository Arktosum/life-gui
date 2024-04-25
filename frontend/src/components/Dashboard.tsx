import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logoutUser } from "../features/userSlice";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await dispatch(logoutUser());
    if (response.meta.requestStatus == "fulfilled") navigate("/login");
  }
  return (
    <div className="h-[100dvh] bg-black flex flex-col">
      <div className="top-nav border-2 bg-gray-600 h-[10%]">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="content border-2 border-blue-600 h-[10%] flex-1"></div>
      <div className="bottom-nav border-2 border-green-600 h-[10%]"></div>
    </div>
  );
}
