import { Routes ,Route} from 'react-router-dom'

import './App.css'
import FinancesPage from './Components/FinancesPage/FinancesPage'
import FriendsPage from './Components/FriendsPage/FriendsPage'
import TodosPage from './Components/TodosPage/TodosPage'
import LoginPage from './Components/LoginPage/LoginPage'
import AppOrigin from './Components/AppOrigin'
import RequireAuth from './Components/RequireAuth'


function App() {
  return (
    <>
      <Routes>
        {/* Global Route */}
        <Route path = "/" element={<AppOrigin/>}>
          {/* Public Routes */}
          <Route path = "/" element={<LoginPage/>}/>
          <Route path = "/login" element={<LoginPage/>}/>
          {/* <Route path = "unauthorized" element={<UnauthorizedPage/>}/> */}
      
          {/* Protected Routes */}
          <Route element={<RequireAuth/>}>
            <Route path = "/todos" element={<TodosPage/>}/>
            <Route path = "/finances" element={<FinancesPage/>}/>
            <Route path = "/friends" element={<FriendsPage/>}/>
          </Route>

          {/* Missing Routes */}
          <Route path = "*" element={<><h1>Missing Route</h1></>} />
         </Route>
      </Routes>
    </>
  )
}

export default App
