import { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter,
  Routes,
  Navigate
} from "react-router-dom";
import AddPlate from './components/AddPlate';
import Header from './components/Header';
import HomePage from './components/HomePage';
import UserPlates from './components/UserPlates';
import UserProfile from './components/UserProfile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App w-screen h-screen bg-gradient-to-b from-spray-50 to-green-200 overflow-x-hidden">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={ <Navigate to="/" /> }/>
          <Route path="/" element={<HomePage />}>
            <Route path="addAPlate" element={<AddPlate />}/>
            <Route path="userPlates" element={<UserPlates />}/>
            <Route path="userProfile" element={<UserProfile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
