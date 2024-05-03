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
import Root from "./components/Root.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="finance/:id" element={<FinancePayPage />} />
          <Route path="finance/history" element={<FinanceHistoryPage />} />
          <Route path="friend" element={<FriendPage />} />
          <Route path="diary" element={<DiaryPage />} />
          <Route path="todo" element={<TodoPage />} />
        </Route>

        {/* Invalid routes */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
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
