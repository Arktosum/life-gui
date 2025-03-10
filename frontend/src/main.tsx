import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";

import axios from "axios";

// const baseURL = "http://localhost:4000";
const baseURL = "http://192.168.0.126:4000"; // To Work on Local host for other devices.
// const baseURL = "https://life-gui.onrender.com";

axios.defaults.baseURL = baseURL;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </BrowserRouter>
);
