import { useState, useEffect } from "react";
import measurementUnit from "./foodMeasurementUnit";
import IndivIngredientInput from "./IndivIngredientInput";

export default function AddPlate () {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [ingredientNum, setIngredientNum] = useState(3)

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
        let ingredientStringArr = [];

        for(let i = 1 ; i < ingredientNum+1 ; i++){
            let str = "";
            str = ingredientObj[`amount-${i}`] + " "+ ingredientObj[`unit-${i}`] + " " + ingredientObj[`ingredient-${i}`];
            ingredientStringArr.push(str);
        }

        console.log(ingredientStringArr)
    }

    const handleAddIngredient = (event) => {
        event.preventDefault();
        setIngredientNum(ingredientNum + 1);
    }

    const handleRemoveIngredient = (event) => {
        event.preventDefault();
        if(ingredientNum !== 1){
            setIngredientNum(ingredientNum - 1);
        }
    }

    const ingredientForm = [];

    for(let i = 0 ; i < ingredientNum ; i++){
        ingredientForm.push(<IndivIngredientInput key={i} num={i+1}/>)
    }
        
    
    return(
        <>
            <div className="bg-white w-3/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center">
                <h1 className="font-semibold leading-snug text-4xl mt-0 mb-3 text-center">Add A Plate</h1>
                <p className="text-center">Hi, User! What'll be on your plate today?</p>
                <form className="" onSubmit={handleSubmit}>
                    <div className="my-10">
                        {ingredientForm}
                    </div>
                    <div className="text-center">
                        <button 
                            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={handleAddIngredient}>
                                Add Ingredient
                        </button>
                        {ingredientNum > 1 ? 
                        <button 
                            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={handleRemoveIngredient}>
                                Remove Ingredient
                        </button> : ""}
                    </div>
                    <div className="text-center">
                        <button 
                            type="submit"
                            className="text-white bg-spray-600 hover:bg-spray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-5">
                                Add Plate
                        </button>
                    </div>
                </form>
            </div>
            {/* <div className="bg-white w-3/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                <p>Nutritional info on:</p>
                <p>{JSON.stringify(data)}</p>
            </div> */}
        </>
    )
}