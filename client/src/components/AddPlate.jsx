import { useState, useEffect } from "react";
import measurementUnit from "./foodMeasurementUnit";

export default function AddPlate () {
    const [data, setData] = useState([]);
    const [ingredientForm, setIngredientForm] = useState([]);
    const [status, setStatus] = useState("");
    const [ingredientNum, setIngredientNum] = useState(0)

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

    const handleSubmit = (event) => {
        event.preventDefault();

        let myFormData = new FormData(event.target);
        let ingredientObj = Object.fromEntries(myFormData.entries());

        console.log(ingredientObj)
    }

    const handleAddIngredient = (event) => {
        event.preventDefault();
        setIngredientForm([...ingredientForm, 
            ingredientFormElementArray
        ])
    }

    // const handleRemoveIngredient = () => {
    //     setIngredientForm()
    // }

    const ingredientFormElementArray = [];
    const measurementElement = measurementUnit.map((unit, index) => {
        return(
            <option value={unit} key={index}>{unit}</option>
        )
    })

    for(let i = 0 ; i < 3 ; i++){
        const ingredientFormElement = 
            <div className="grid md:grid-cols-4 md:gap-6 my-2" key={i}>
                <div className="col-span-2">
                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredient</label>
                    <input required type="text" id="ingredient" name={`ingredient-${i+1}`} placeholder="e.g. rice" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="">
                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                    <input required type="number" id="amount" name={`amount-${i+1}`} placeholder="1" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="">
                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                    <select required id="unit" name={`unit-${i+1}`} placeholder="cup" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option></option>
                        {measurementElement}
                    </select>
                </div>
            </div>;
        ingredientFormElementArray.push(ingredientFormElement);
    }

    return(
        <>
            <div className="bg-white w-2/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl">
                <h1 className="font-semibold leading-snug text-4xl mt-0 mb-3 text-center">Add A Plate</h1>
                <p className="text-center">Hi, User! What'll be on your plate today?</p>
                <form className="" onSubmit={handleSubmit}>
                    <div className="my-10">
                        {ingredientFormElementArray}
                        {ingredientForm}
                    </div>
                    <button 
                        className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleAddIngredient}>
                            Add Ingredient
                    </button>
                    <button 
                        type="submit"
                        className="text-white bg-spray-600 hover:bg-spray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Add Plate
                    </button>
                </form>
            </div>
            {/* <div className="bg-white w-3/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                <p>Nutritional info on:</p>
                <p>{JSON.stringify(data)}</p>
            </div> */}
        </>
    )
}