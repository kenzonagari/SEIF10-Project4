import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function HomePage () {

    const [data, setData] = useState([]);
    const [ingredientForm, setIngredientForm] = useState([]);
    const [status, setStatus] = useState("");

    return(
        <>
            <Navbar />
            <div className="flex flex-col m-10 ">
                <div className="flex flex-row justify-center items-start flex-wrap">
                    <img src="/SVG/plate.svg" className="w-1/4 mr-10 drop-shadow-lg animate-spin"/>
                    <Outlet />     
                </div> 
            </div>
        </>
    )
}