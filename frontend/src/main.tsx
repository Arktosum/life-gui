import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

import Dashboard from "./pages/Dashboard.tsx";
import DiaryPage from "./pages/DiaryPage.tsx";
import FinancePage from "./pages/FinancePage.tsx";
import FriendPage from "./pages/FriendPage.tsx";
import Login from "./pages/Login.tsx";
import TodoPage from "./pages/TodoPage.tsx";
import React from "react";
import FinancePayPage from "./pages/FinancePayPage.tsx";
import FinanceHistoryPage from "./pages/FinanceHistoryPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { PrivateRoute } from "./pages/PrivateRoute.tsx";
import { Root } from "./pages/Root.tsx";
import FinanceAnalyticsPage from "./pages/FinanceAnalyticsPage.tsx";



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
      <Route path="/finance/analytics" element={<PrivateRoute><FinanceAnalyticsPage/></PrivateRoute>} />
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
