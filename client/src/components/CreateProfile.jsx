import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProfile () {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
        try {
            const response = await fetch(
              `/api/userlogin/signin`,
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
                    return navigate("/home");
                }
                throw new Error("Network error");
            }
            const data = await response.json();
            setData(data);
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
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();

        let myFormData = new FormData(event.target);
        let userProfileObj = Object.fromEntries(myFormData.entries());

        setStatus("loading");

        fetch('/api/userprofile', {    
            method: "POST", 
            headers: {
                        "Content-type": "application/json", //* vvvvv important, otherwise server receives empty object
                        "x-access-token": localStorage.getItem("token")
                    },
            body: JSON.stringify(userProfileObj) 
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.msg === "user profile created"){
                localStorage.setItem("token", data.authToken);
                setStatus("complete");
                navigate("/home");
            }
        })
        .catch((error) => {
            setStatus("error");
            console.error('Error:', error);
        });
    }

    return(
        <div className="bg-white w-fit h-fit p-10 m-auto my-10 rounded-xl border border-gray-200 shadow-xl">
            <h1 className="text-4xl font-bold tracking-tight text-center">Complete User Profile</h1>
            
            <div className="overflow-x-auto relative sm:rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-3 md:gap-6 items-center mt-10">
                        <label htmlFor="small-input" className="block mb-2 ml-6 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input required type="text" id="username" name="username" defaultValue={data?.username} className="col-span-2 block ml-5 p-2 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    
                        <label htmlFor="small-input" className="block mb-2 ml-6 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                        <input required type="text" id="age" name="age" className="col-span-2 block ml-5 p-2 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                
                        <label htmlFor="small-input" className="block mb-2 ml-6 text-sm font-medium text-gray-900 dark:text-white">Height (in cm)</label>
                        <input required type="text" id="height" name="height" className="col-span-2 block ml-5 p-2 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                
                        <label htmlFor="small-input" className="block mb-2 ml-6 text-sm font-medium text-gray-900 dark:text-white">Weight (in kg)</label>
                        <input required type="text" id="weight" name="weight" className="col-span-2 block ml-5 p-2 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="text-center mt-10">
                        <button 
                        type="submit"
                        className="text-white bg-spray-600 hover:bg-spray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-5">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}