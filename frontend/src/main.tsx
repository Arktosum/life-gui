import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

import React from "react";
import Root from "./components/Root";
import PrivateRoute from "./components/PrivateRoute";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<p>Logino</p>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <p>Dashboard</p>
              </PrivateRoute>
            }
          />
          <Route
            path="/finance"
            element={
              <PrivateRoute>
                <p>Finance</p>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<p>Error page</p>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
