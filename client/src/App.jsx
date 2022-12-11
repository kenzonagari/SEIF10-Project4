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
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import UserPlates from './components/UserPlates';
import UserProfile from './components/UserProfile';

const imgUrl = {
  chickenBowl: "/SVG/chickenbowl.svg",
  plate: "/SVG/plate.svg",
  riceBowl: "/SVG/ricebowl.svg",
  salmonBowl: "/SVG/salmonbowl.svg"
}

function App() {
  const [count, setCount] = useState(0);
  const [imageSrc, setImageSrc] = useState(imgUrl.plate);

  const handleImageSrc = (str) => {
    useEffect(() => {
        setImageSrc(str)
    },[])
  }

  return (
    <div className="App w-screen h-screen bg-gradient-to-b from-spray-50 to-green-200 overflow-x-hidden">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={ <Navigate to="/" /> }/>
          <Route path="/" element={<HomePage imageSrc={imageSrc} handleImageSrc={handleImageSrc}/>}>
            <Route path="addAPlate" element={<AddPlate handleImageSrc={handleImageSrc}/>}/>
            <Route path="userPlates" element={<UserPlates handleImageSrc={handleImageSrc}/>}/>
            <Route path="userProfile" element={<UserProfile handleImageSrc={handleImageSrc}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
