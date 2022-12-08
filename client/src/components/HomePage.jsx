import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function HomePage () {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const fetchPosts = async () => {
          try {
            const response = await fetch(
              `https://api.edamam.com/api/nutrition-data?app_id=05ca2114&app_key=6d03af6370c26f9caa8d71972e5d53c3%09&nutrition-type=cooking&ingr=1%20salmon
              `,
              {
                signal,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              throw new Error("Network error");
            }
            const data = await response.json();
            setData(data);
            console.log(data)
            setStatus("done");
          } catch (error) {
            setStatus("error");
            console.log(error);
          }
        };
        setStatus("loading");
        fetchPosts();
    
        return () => {
          //   console.log("cleanup");
          controller.abort();
        };
    }, []);

    return(
        <>
            <Navbar />
            <div className="flex flex-row justify-between">
                <div className="bg-white w-1/2 p-10 ml-10 mr-2 rounded-xl border border-gray-400 shadow-lg">
                    <p>Hello, User!</p>
                    <p>Input Recipe or Ingredients below:</p>
                    <div className="flex flex-row justify-between mt-10">
                        <div>
                            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredient</label>
                            <input type="text" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                            <input type="text" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                            <input type="text" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                    </div>
                </div>
                <div className="bg-white w-1/2 p-10 mr-10 ml-2 rounded-xl border border-gray-400 shadow-lg overflow-hidden">
                    <p>Nutritional info on:</p>
                    <p>{JSON.stringify(data)}</p>
                </div>
            </div>  
        </>
    )
}