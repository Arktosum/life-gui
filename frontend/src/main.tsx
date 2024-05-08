import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

import Dashboard from "./components/Dashboard.tsx";
import DiaryPage from "./components/DiaryPage.tsx";
import FinancePage from "./components/FinancePage.tsx";
import FriendPage from "./components/FriendPage.tsx";
import Login from "./components/Login.tsx";
import TodoPage from "./components/TodoPage.tsx";
import React from "react";
import FinancePayPage from "./components/FinancePayPage.tsx";
import FinanceHistoryPage from "./components/FinanceHistoryPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import { isAuthorized } from "./features/userSlice.ts";


function Root(){
  const authorized = isAuthorized();
  return authorized? <Navigate to="/dashboard" /> : <Navigate to="/login"/>
}
function PrivateRoute({children} : React.PropsWithChildren){
  const authorized = isAuthorized();
  return authorized? children : <Navigate to="/"/>
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root/>} />
      {/* Public routes */}
      <Route path="/login" element={<Login/>} />
      {/* Protected routes */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      <Route path="/finance" element={<PrivateRoute><FinancePage/></PrivateRoute> } />
      <Route path="/finance/:id" element={<PrivateRoute><FinancePayPage/></PrivateRoute> } />
      <Route path="/finance/history" element={<PrivateRoute><FinanceHistoryPage/></PrivateRoute>} />
      <Route path="/friend" element={<PrivateRoute><FriendPage/></PrivateRoute> } />
      <Route path="/diary" element={<PrivateRoute><DiaryPage/></PrivateRoute> } />
      <Route path="/todo" element={<PrivateRoute><TodoPage/></PrivateRoute> } />
      {/* Invalid routes */}
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
