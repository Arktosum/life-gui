import "./App.css";
import Login from "./components/Login";
import { useAppSelector } from "./app/hooks";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import NotFoundPage from "./components/NotFoundPage";
import FriendPage from "./components/FriendPage";
import FinancePage from "./components/FinancePage";
import HomePage from "./components/HomePage";


function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/main" /> : <Login/>} />
        <Route path="/main" element={isAuthenticated ? <Layout/> : <Navigate to="/login"/>}>
            <Route path="" element={<HomePage/> } />
            <Route path="friend" element={<FriendPage/> } />
            <Route path="finance" element={<FinancePage/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
