import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import DiaryPage from "./components/DiaryPage.tsx";
import FinancePage from "./components/FinancePage.tsx";
import FriendPage from "./components/FriendPage.tsx";
import Landing from "./components/Landing.tsx";
import Login from "./components/Login.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Signup from "./components/Signup.tsx";
import TodoPage from "./components/TodoPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Landing />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="diary" element={<DiaryPage />} />
        <Route path="friend" element={<FriendPage />} />
        <Route path="todo" element={<TodoPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
