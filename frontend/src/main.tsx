import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import axios from "axios";
import "./common.css";
import Dashboard from "./pages/Dashboard";
import FinanceAnalytics from "./pages/FinanceAnalytics";
import FriendPage from "./pages/FriendPage";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FinanceDashboard from "./pages/FinanceDashboard";
import FinanceHistory from "./pages/FinanceHistory";
import FinanceCheckoutUpdate from "./pages/FinanceCheckoutUpdate";
import FinanceCheckout from "./pages/FinanceCheckout";

axios.defaults.baseURL = `https://life-gui.onrender.com/api`;
// axios.defaults.baseURL = `http://localhost:5000/api`;
// axios.defaults.baseURL = `http://192.168.0.132:5000/api`;

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
    path: "/finance/dashboard",
    element: (
      <PrivateRoute>
        <FinanceDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/finance/history",
    element: (
      <PrivateRoute>
        <FinanceHistory />
      </PrivateRoute>
    ),
  },
  {
    path: "/finance/checkout_update/:transaction_id",
    element: (
      <PrivateRoute>
        <FinanceCheckoutUpdate />
      </PrivateRoute>
    ),
  },
  {
    path: "/finance/checkout/:finance_user_id",
    element: (
      <PrivateRoute>
        <FinanceCheckout />
      </PrivateRoute>
    ),
  },
  {
    path: "/finance/analytics",
    element: (
      <PrivateRoute>
        <FinanceAnalytics />
      </PrivateRoute>
    ),
  },
  {
    path: "/friend",
    element: (
      <PrivateRoute>
        <FriendPage />
      </PrivateRoute>
    ),
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
