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

axios.defaults.baseURL = `https://life-gui.onrender.com/api`;
// axios.defaults.baseURL = `http://localhost:5000/api`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/finance",
    element: <Finance />,
    errorElement: <NotFound />,
  },
  {
    path: "/finance/payment/:finance_user_id",
    element: <FinancePayment />,
    errorElement: <NotFound />,
  },
  {
    path: "/finance/info/:transaction_id",
    element: <FinanceInfo />,
    errorElement: <NotFound />,
  },
  {
    path: "/finance/analytics",
    element: <FinanceAnalytics />,
    errorElement: <NotFound />,
  },
  {
    path: "/friend",
    element: <FriendPage />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
