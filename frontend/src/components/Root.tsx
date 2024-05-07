import { useNavigate } from "react-router-dom";
import { isAuthorized } from "../features/userSlice";
import { useEffect } from "react";

export default function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = isAuthorized();
    console.log("root", auth);
    if (auth) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return <></>;
}
