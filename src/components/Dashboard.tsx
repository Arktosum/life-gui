// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../app/hooks";
// import { logoutUser } from "../features/authSlice";
import FinancePage from "./FinancePage";
// import FriendPage from "./FriendPage";

export default function Dashboard() {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   navigate("/login");
  // };
  // Automatic Deploy check!
  return ( 
    //   <div>
    //     <h1>Welcome to Dashboard</h1>
    //     <button onClick={handleLogout}>Logout</button>
    //   </div>
    <FinancePage />
    // <FriendPage/>
  );
}
