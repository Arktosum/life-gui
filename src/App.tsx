import "./App.css";
import Login from "./components/Login";
import { useAppSelector } from "./hooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/dashboard" Component={Dashboard} />
    </Routes>
  );
}

export default App;
