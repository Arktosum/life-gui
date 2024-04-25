import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAuthorized } from "../features/userSlice";

export default function Landing() {
  const navigate = useNavigate();
  const authorized = isAuthorized();
  useEffect(() => {
    authorized ? navigate("/dashboard") : navigate("/login");
  }, [authorized, navigate]);
  console.log("landing!");
  return (
    <>
      <Outlet />
    </>
  );
}
