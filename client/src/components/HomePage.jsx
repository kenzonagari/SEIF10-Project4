import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function HomePage ({imageSrc, handleImageSrc}) {

    const [data, setData] = useState([]);
    const [ingredientForm, setIngredientForm] = useState([]);
    const [status, setStatus] = useState("");

    const handleImageSrcProps = () => {
        handleImageSrc("/SVG/plate.svg");
    }
    handleImageSrcProps();

    return(
        <>
            <Navbar />
            <div className="flex flex-col m-10">
                <div className="flex flex-row justify-center items-start flex-wrap">
                    <Link to="/addAPlate" className="w-1/4 mr-10 drop-shadow-lg animate-spinSlow cursor-pointer hover:scale-105 hover:animate-spin">
                        <img src={imageSrc} />
                    </Link>
                    <Outlet />     
                </div> 
            </div>
        </>
    )
}