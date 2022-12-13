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
import CreateProfile from './components/CreateProfile';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import UpdatePlate from './components/UpdatePlate';
import UserPlates from './components/UserPlates';
import UserProfile from './components/UserProfile';

const imgUrl = [
  "/SVG/chickenbowl.svg","/SVG/ricebowl.svg","/SVG/salmonbowl.svg"
]

function App() {
  const [count, setCount] = useState(0);
  const [imageSrc, setImageSrc] = useState(imgUrl.plate);

  useEffect(() => {
      setImageSrc(imgUrl[Math.floor(Math.random()*3)])
  },[])

  const handleImageSrc = (str) => {
    useEffect(() => {
        setImageSrc(str)
    },[])
  }

  return (
    <div className="App flex flex-col justify-between w-screen h-screen bg-[url('/SVG/bg-img.svg')] bg-cover from-spray-50 to-green-200 overflow-x-hidden">
      <div>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/home" element={ <Navigate to="/" /> }/>
            <Route path="/signIn" element={ <SignIn />}/> 
            <Route path="/signUp" element={ <SignUp />}/> 
            <Route path="/createProfile" element={ <CreateProfile />}/>
            <Route path="/" element={<HomePage imageSrc={imageSrc} handleImageSrc={handleImageSrc}/>}>
              <Route path="addAPlate" element={<AddPlate handleImageSrc={handleImageSrc}/>}/>
              <Route path="userPlates" element={<UserPlates handleImageSrc={handleImageSrc}/>}/>
              <Route path="userProfile" element={<UserProfile handleImageSrc={handleImageSrc}/>}/>
              <Route path="updatePlate/:plateId" element={<UpdatePlate handleImageSrc={handleImageSrc}/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  )
}

export default App
