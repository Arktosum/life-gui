import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAuthorized } from "../features/userSlice";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const authorized = isAuthorized();

  useEffect(() => {
    if (!authorized) {
      navigate("/login");
    }
  }, [authorized, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}
