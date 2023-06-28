import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import todoReducer from './Components/features/Todo'

const store = configureStore({
  reducer:{
    todo : todoReducer
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store ={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
