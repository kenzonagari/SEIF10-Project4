import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

export default function HomePage ({imageSrc, handleImageSrc}) {

    const [data, setData] = useState([]);
    const [ingredientForm, setIngredientForm] = useState([]);
    const [status, setStatus] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
        try {
            const response = await fetch(
              `/api/userprofile`,
              {
                signal,
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": localStorage.getItem("token")
                }
              }
            );
            if (!response.ok) {
                if(response.status === 401){
                    return navigate("/signUp");
                }
                if(response.status === 403){
                    return navigate("/createProfile");
                }
                throw new Error("Network error");
            }
            const data = await response.json();
            setData(data);
            setUsername(data[0].username.username);
            setStatus("done");
        } catch (error) {
            setStatus("error");
            setData([]);
            console.log(error);
        }};

        setStatus("loading");
        fetchData();
    
        return () => {
          //   console.log("cleanup");
          controller.abort();
        };

    }, []);

    const handleImageSrcProps = () => {
        handleImageSrc("/SVG/plate.svg");
    }
    handleImageSrcProps();

    return(
        <>
            <Header signedIn={true}/>
            <Navbar username={username}/>
            <div className="flex flex-col m-10">
                <div className="flex flex-row justify-center items-start flex-wrap">
                    <Link to="/addAPlate" className="w-1/4 mr-10 drop-shadow-lg cursor-pointer animate-spinSlow hover:scale-105 hover:animate-spin">
                        <img src={imageSrc} data-tooltip-target="tooltip-default"/>
                    </Link>
                    <Outlet />     
                </div> 
            </div>
        </>
    )
}