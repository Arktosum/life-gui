import { Routes ,Route, useNavigate} from 'react-router-dom'

import './App.css'
import FinancesPage from './Components/FinancesPage/FinancesPage'
import FriendsPage from './Components/FriendsPage/FriendsPage'
import TodosPage from './Components/TodosPage/TodosPage'
import HomePage from './Components/HomePage/HomePage'
import { useAppSelector } from './app/hooks'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate();
  const token = useAppSelector(state=> state.auth.token)
  useEffect(()=>{
    if(token == null){
      navigate('/');
    }
  },[token])

  return (
    <>
    <div>
      <Routes>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "/todos" element={<TodosPage/>}/>
        <Route path = "/finances" element={<FinancesPage/>}/>
        <Route path = "/friends" element={<FriendsPage/>}/>
        <Route path = "*" element={<HomePage/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
