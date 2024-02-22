import { Routes, Route } from "react-router-dom";

import "./App.css";
import TodosPage from "./Components/TodosPage/TodosPage";
import AppOrigin from "./Components/AppOrigin";

function App() {
  return (
    <>
      <Routes>
        {/* Global Route */}
        <Route path="/" element={<AppOrigin />}>
          {/* Public Routes */}
          {/* <Route path = "/" element={<LoginPage/>}/> */}
          {/* <Route path = "/login" element={<LoginPage/>}/> */}
          {/* <Route path = "unauthorized" element={<UnauthorizedPage/>}/> */}

          {/* Protected Routes */}
          {/* <Route element={<RequireAuth/>}> */}
          <Route path="/" element={<TodosPage />} />
          {/* </Route> */}

          {/* Missing Routes */}
          <Route
            path="*"
            element={
              <>
                <h1>Missing Route</h1>
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
