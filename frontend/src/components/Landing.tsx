import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}
