import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { applyMiddleware, configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import todoReducer from './Components/features/Todo'

let reducer = {
  todo : todoReducer
}
const store = configureStore({reducer},applyMiddleware(thunk))

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store ={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
