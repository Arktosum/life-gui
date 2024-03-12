import "./App.css";
import Login from "./components/Login";
import { useAppSelector } from "./app/hooks";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NotFoundPage from "./components/NotFoundPage";
import FriendPage from "./components/FriendPage";
import FinancePage from "./components/FinancePage";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />}>
          <Route path="friend" element={<FriendPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
