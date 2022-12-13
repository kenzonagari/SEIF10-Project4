import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IndivIngredientInput from "./IndivIngredientInput";

export default function AddPlate ({handleImageSrc}) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [ingredientNum, setIngredientNum] = useState(3);
    const navigate = useNavigate();

    const handleImageSrcProps = () => {
        handleImageSrc("/SVG/chickenbowl.svg");
    }
    handleImageSrcProps();
     
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

        const addPlateObj = {
            ingredients: ingredientStringArr,
            calories: 0
        };

        fetch('/api/plate', {    
            method: "POST", 
            headers: {
                        "Content-type": "application/json", //* vvvvv important, otherwise server receives empty object
                        "x-access-token": localStorage.getItem("token")
                    },
            body: JSON.stringify(addPlateObj) 
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.msg === 'plate created'){
                navigate("/userPlates");
            }
            console.log(data)
        });
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
        ingredientForm.push(<IndivIngredientInput key={i} num={i+1} />)
    }
        
    
    return(
        <>
            <div className="bg-white w-3/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl flex flex-col items-center">
                <h1 className="text-4xl font-bold tracking-tight mt-0 mb-3 text-center">Add A Plate</h1>
                <form className="" onSubmit={handleSubmit}>
                    <div className="my-10">
                        {ingredientForm}
                    </div>
                    <div className="text-center">
                        {ingredientNum > 1 ? 
                        <button 
                            className="text-white bg-rose-500 hover:bg-rose-800 focus:ring-4 focus:ring-blue-300 font-black text-xl rounded-full w-10 h-10 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={handleRemoveIngredient}>
                                -
                        </button> : ""}
                        <button 
                            className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-blue-300 font-black text-xl rounded-full w-10 h-10 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={handleAddIngredient}>
                                +
                        </button>
                    </div>
                    <div className="text-center">
                        <button 
                            type="submit"
                            className="text-white bg-spray-600 hover:bg-spray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-5">
                                Add Plate
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}