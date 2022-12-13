import { useState, useEffect } from "react";
import IndivPlate from "./IndivPlate"
import NutritionInfo from "./NutritionInfo";

const seed = [
    ["1 kg salmon", "1 g rice"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 g salmon", "1 g rice", "1 L milk"],
    ["1/2 whole salmon", "1 cup rice", "1 ml milk", "1 whole apple"],
    ["5 whole banana", "1 whole orange"]
]
export default function UserPlates ({handleImageSrc}) {
    const [plateArray, setPlateArray] = useState([]);
    const [data, setData] = useState([]);
    const [plates, setPlates] = useState([]);
    const [platesId, setPlatesId] = useState([])
    const [status, setStatus] = useState("");
    const [showNutrition, setShowNutrition] = useState(true);
    
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
            const platesTemp = [];
            const platesIdTemp = [];
            for(const element of data[0].plates){
                platesTemp.push(element.ingredients);
                platesIdTemp.push(element.id);
            }
            setPlates(platesTemp);
            setPlatesId(platesIdTemp);
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
        handleImageSrc("/SVG/ricebowl.svg");
    }
    handleImageSrcProps();

    const handleNutrition = (plate) => {
        setPlateArray(plate);
    }

    const plateElement = plates.map((plate, index) => {
        return(
            <IndivPlate plate={plate} key={index} handleNutrition={handleNutrition} plateId={platesId[index]}/>
        )
    })

    const nutritionInfoComp = <NutritionInfo plateIngredients={plateArray}/>

    return(
        <>
            <div className="bg-white w-3/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl">
                <h1 className="text-4xl font-bold tracking-tight mt-0 mb-3 text-center">{data[0]?.username?.username}'s Plates</h1>
                <p className="font-normal leading-snug text-md mt-0 mb-5 text-center">Click on a plate to find its nutritional info!</p>
                <div className="flex flex-row flex-wrap justify-center">
                    {plateElement}
                </div>
            </div>
            {plateArray.length > 0 && showNutrition? nutritionInfoComp : ""}
        </>    
 
    )
}