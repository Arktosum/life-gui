import { Routes ,Route} from 'react-router-dom'

import './App.css'
import FinancesPage from './Components/FinancesPage/FinancesPage'
import FriendsPage from './Components/FriendsPage/FriendsPage'
import Navbar from './Components/Navbar'
import TodosPage from './Components/TodosPage/TodosPage'
import HomePage from './Components/HomePage/HomePage'

function App() {

  return (
    <>
    <div>
      <Navbar/>
      <Routes>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "/todos" element={<TodosPage/>}/>
        <Route path = "/finances" element={<FinancesPage/>}/>
        <Route path = "/friends" element={<FriendsPage/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
