import {  useNavigate } from "react-router-dom";
import { isAuthorized } from "../features/userSlice";
import { useEffect } from "react";

export default function PrivateRoute({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = isAuthorized();
    if (auth) navigate("/login");
  }, [navigate]);
  return (
    <>
      <div>PrivateRoute</div>
      {children}
    </>
  );
}
