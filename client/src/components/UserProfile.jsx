import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function UserProfile ({handleImageSrc}) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [updateProfile, setUpdateProfile] = useState(false);
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

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        let myFormData = new FormData(event.target);
        let userProfileObj = Object.fromEntries(myFormData.entries());

        fetch('/api/userprofile', {    
            method: "PUT", 
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
            console.log(data)
            if(data.msg === "redirecting to /userprofile"){
                setUpdateProfile(false);
                setData([
                    {
                        age: userProfileObj.age,
                        height: userProfileObj.height,
                        weight: userProfileObj.weight,
                        username: {username: userProfileObj.username}
                    }
                ]);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleImageSrcProps = () => {
        handleImageSrc("/SVG/salmonbowl.svg");
    }
    handleImageSrcProps();

    const handleTurnOnUpdateProfile = (bool) => () => {
        setUpdateProfile(bool);
    }

    const tableDiv =             
        <table className="w-4/5 text-sm text-left text-gray-500 dark:text-gray-400 mt-10">
            <tbody>
                <tr className="dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Username
                    </th>
                    <td className="py-4 px-6 text-spray-700 font-bold text-base">
                        {data[0]?.username?.username}
                    </td>
                </tr>
                <tr className="dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Age
                    </th>
                    <td className="py-4 px-6 text-spray-700 font-bold text-base">
                    {data[0]?.age}
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Height
                    </th>
                    <td className="py-4 px-6 text-spray-700 font-bold text-base">
                    {data[0]?.height} <span className="font-semibold">cm</span>
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Weight
                    </th>
                    <td className="py-4 px-6 text-spray-700 font-bold text-base">
                    {data[0]?.weight} <span className="font-semibold">kg</span>
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        BMI
                    </th>
                    <td className="py-4 px-6 text-spray-700 font-bold text-base">
                        {((data[0]?.weight / data[0]?.height / data[0]?.height) * 10000).toFixed(1)}
                    </td>
                </tr>
            </tbody>
        </table>;

    const formDiv = 
        <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-3 md:gap-6 items-center mt-10">
                <label htmlFor="small-input" className="block mb-2 ml-6 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input required type="text" id="username" name="username" defaultValue={data[0]?.username?.username} className="col-span-2 block ml-5 p-2 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            
                <label htmlFor="small-input" className="block mb-2 ml-6 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                <input required type="text" id="age" name="age" defaultValue={data[0]?.age} className="col-span-2 block ml-5 p-2 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        
                <label htmlFor="small-input" className="block mb-2 ml-6 text-sm font-medium text-gray-900 dark:text-white">Height (in cm)</label>
                <input required type="text" id="height" name="height" defaultValue={data[0]?.height} className="col-span-2 block ml-5 p-2 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        
                <label htmlFor="small-input" className="block mb-2 ml-6 text-sm font-medium text-gray-900 dark:text-white">Weight (in kg)</label>
                <input required type="text" id="weight" name="weight" defaultValue={data[0]?.weight} className="col-span-2 block ml-5 p-2 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="text-center mt-10">
                <button 
                type="button"
                onClick={handleTurnOnUpdateProfile(false)}
                className="text-white bg-spray-600 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-5">
                    Cancel
                </button>
                <button 
                type="submit"
                className="text-white bg-spray-600 hover:bg-spray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-5">
                    Submit
                </button>
            </div>
        </form>;

    return(
        <div className="bg-white w-3/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl">
            <h1 className="font-semibold leading-snug text-4xl mt-0 mb-3 text-center">User Profile</h1>
            
        <div className="overflow-x-auto relative sm:rounded-lg">
            {updateProfile ? formDiv : tableDiv}
            
            <div className="text-center mt-10">
                {updateProfile ? 
                    ""
                    :
                    <button 
                        type="button"
                        onClick={handleTurnOnUpdateProfile(true)}
                        className="text-white bg-spray-600 hover:bg-spray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-5">
                            Update Profile
                    </button>
                }
            </div>
        </div>

        </div>
    )
}