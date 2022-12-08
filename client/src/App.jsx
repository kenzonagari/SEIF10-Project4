import { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter,
  Routes,
  Navigate
} from "react-router-dom";
import Header from './components/Header';
import HomePage from './components/HomePage';

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className="App w-screen h-screen bg-teal-50">
      <Header />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <Navigate to="/home" /> }/>
          <Route path="/home" element={<HomePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
