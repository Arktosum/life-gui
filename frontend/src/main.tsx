import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Finance from "./pages/Finance";
import axios from "axios";
import "./common.css";
import FinancePayment from "./pages/FinancePayment";
import FinanceInfo from "./pages/FinanceInfo";
import Dashboard from "./pages/Dashboard";
import FinanceAnalytics from "./pages/FinanceAnalytics";
import FriendPage from "./pages/FriendPage";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.baseURL = `https://life-gui.onrender.com/api`;
// axios.defaults.baseURL = `http://localhost:5000/api`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/finance",
    element: (
      <PrivateRoute>
        <Finance />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/finance/payment/:finance_user_id",
    element: (
      <PrivateRoute>
        <FinancePayment />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/finance/info/:transaction_id",
    element: (
      <PrivateRoute>
        <FinanceInfo />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/finance/analytics",
    element: (
      <PrivateRoute>
        <FinanceAnalytics />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/friend",
    element: (
      <PrivateRoute>
        <FriendPage />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
