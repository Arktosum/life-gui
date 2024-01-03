import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks"



export default function RequireAuth() {
    const token = useAppSelector(state=>state.auth.token);
    const location = useLocation();
  return (
    token !=null ? <Outlet/> : <Navigate to="/login" state= {{from : location}} replace />
  )
}
