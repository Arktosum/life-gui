import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/NotFound";
import Finance from "./pages/Finance";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FinancePayment from "./pages/FinancePayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "finance",
    element: <Finance />,
  },
  {
    path: "finance/payment/:id",
    element: <FinancePayment />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
);
