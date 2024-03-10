import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logoutUser } from "../features/authSlice";
import FinancePage from "./FinancePage";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    //   <div>
    //     <h1>Welcome to Dashboard</h1>
    //     <button onClick={handleLogout}>Logout</button>
    //   </div>
    <FinancePage />
  );
}
