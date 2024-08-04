import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Finance from "./pages/Finance";
import axios from "axios";

// axios.defaults.baseURL = `https://life-gui.onrender.com/api`;
axios.defaults.baseURL = `http://localhost:5000/api`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Finance />,
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
