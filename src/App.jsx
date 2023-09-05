import { Route, Routes } from "react-router-dom";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import Finance from "./components/Finance";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import axios from 'axios';

axios.defaults.baseURL = 'https://life-gui.blazingknightog.repl.co';
// axios.defaults.baseURL = 'mongodb://localhost:27017/';
function App() {
  return (<>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Finance/>}/>
      <Route path="/finance" element={<Finance/>}/>
      <Route path="/halloffriends" element={<Finance/>}/>
      <Route path="/diary" element={<Finance/>}/>
    </Routes>
    {/* <TodoList/> */}
  </>)
}

export default App;
