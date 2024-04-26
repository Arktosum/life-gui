import { Link, useNavigate } from "react-router-dom";
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
      <div className="top-nav h-[10%] flex justify-end">
        <button className="px-5 py-2 border-2 border-red-600 text-red-600"onClick={handleLogout}>Logout</button>
      </div>
      <div className="content  h-[10%] flex-1 text-white flex flex-col gap-5">
        <div className="bg-gray-800 p-5">
          <Link to="/finance">Go to Finaces</Link>
        </div>
        <div className="bg-gray-800 p-5">
          <Link to="/diary">Go to Diary</Link>
        </div>
        <div className="bg-gray-800 p-5">
          <Link to="/todo">Go to Todo</Link>
        </div>
        <div className="bg-gray-800 p-5">
          <Link to="/friend">Go to Hall of Friends</Link>
        </div>
      </div>
      <div className="bottom-nav border-2 border-green-600 h-[10%]"></div>
    </div>
  );
}
