import { useState } from "react";
import IndivPlate from "./IndivPlate"
import NutritionInfo from "./NutritionInfo";

const seed = [
    ["1 kg salmon", "1 g rice"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 kg salmon", "1 g rice", "10 g boat"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 g salmon", "1 g rice", "1 L milk"]
]
export default function UserPlates ({}) {
    const [plateArray, setPlateArray] = useState([]);

    const handleNutrition = (plate) => {
        setPlateArray(plate);
    }

    const plateElement = seed.map((plate, index) => {
        return(
            <IndivPlate plate={plate} key={index} handleNutrition={handleNutrition}/>
        )
    })

    const nutritionInfoComp = <NutritionInfo plateIngredients={plateArray}/>

    return(
        <>
            <div className="bg-white w-3/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl">
                <h1 className="font-semibold leading-snug text-4xl mt-0 mb-3 text-center">User's Plates</h1>
                <p className="font-normal leading-snug text-md mt-0 mb-5 text-center">Click on a plate to find their nutritional info!</p>
                <div className="flex flex-row flex-wrap justify-center">
                    {plateElement}
                </div>
            </div>
            {plateArray.length > 0 ? nutritionInfoComp : ""}
        </>    
 
    )
}