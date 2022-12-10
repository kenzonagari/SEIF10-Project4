import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArcElement } from 'chart.js';
import { Chart } from "chart.js/auto";
import { Bar, Pie } from 'react-chartjs-2';

export default function NutritionInfo ({plateIngredients}) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const ingredientObj = {
            ingr: plateIngredients
        }

        const fetchData = async () => {
        try {
            const response = await fetch(
              `https://api.edamam.com/api/nutrition-details?app_id=05ca2114&app_key=6d03af6370c26f9caa8d71972e5d53c3
              `,
              {
                signal,
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(ingredientObj)
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
            setData([]);
            console.log(error);
        }
        };

        setStatus("loading");
        fetchData();
    
        return () => {
          //   console.log("cleanup");
          controller.abort();
        };

    }, [plateIngredients]);

    const handleNavigate = () => {
        navigate("/addAPlate");
    }
    
    const barLabel = [];
    const barValue = [];
    const barLabelSub100 = [];
    const barValueSub100 = [];
    let nutrientSub10 = [];
    let nutrientOver100 = [];
    let healthyDiet = [];
    
    if(data?.totalDaily){
        for(const micro in data?.totalDaily){
            barLabel.push(data?.totalDaily[micro]?.label);
            barValue.push(data?.totalDaily[micro]?.quantity);
            if(data?.totalDaily[micro]?.quantity < 100){
                if(data?.totalDaily[micro]?.quantity <= 10){
                    nutrientSub10.push(data?.totalDaily[micro]?.label);
                }
                barLabelSub100.push(data?.totalDaily[micro]?.label);
                barValueSub100.push(data?.totalDaily[micro]?.quantity);
            } else {
                nutrientOver100.push(data?.totalDaily[micro]?.label);
            }
        }
        
        for(const diet of data?.dietLabels){
            healthyDiet.push(diet.toLowerCase().replace(/_/g, " "));
        }

        for(const diet of data?.healthLabels){
            healthyDiet.push(diet.toLowerCase().replace(/_/g, " "));
        }
        
    };


    const ingredientList = plateIngredients.map((ingredient, index) => {
        return(
            <p className="text-center text-md font-bold p-3 px-10 bg-green-100 w-fit m-2 rounded-full" key={index}>{ingredient}</p>
        )
    });

    const nutrientSub10Element = nutrientSub10.map((nutrient, index) => {
        return(
            <p className="text-center text-md font-bold p-3 px-10 bg-green-100 w-fit m-2 rounded-full" key={index}>{nutrient}</p>
        )
    });

    const nutrientOver100Element = nutrientOver100.map((nutrient, index) => {
        return(
            <p className="text-center text-md font-bold p-3 px-10 bg-green-100 w-fit m-2 rounded-full" key={index}>{nutrient}</p>
        )
    });

    const healthyDietElement = healthyDiet.map((diet, index) => {
        return(
            <p className="text-center text-md font-bold p-3 px-10 bg-green-100 w-fit m-2 rounded-full" key={index}>{diet}</p>
        )
    });

    return(
        <>
        <div className="bg-white h-fit w-full m-20 my-10 p-10 rounded-xl border border-gray-200 shadow-xl snap-mandatory snap-y">
            <h1 className="font-semibold leading-snug text-xl mt-0 mb-3 text-center">Nutritional Values of</h1>
            <div className="flex flex-row justify-center">
                {ingredientList}
            </div>
            <div className="flex flex-row items-center flex-wrap snap-start ">
                <div className="m-5">
                    <h1 className="font-extralight leading-snug text-2xl m-5 mt-6 text-center">Your plate has total calories of  <span className="font-bold text-spray-800 text-4xl mx-3">{data?.calories}</span>  kcal,</h1>
                    <h1 className="font-extralight leading-snug text-xl m-2 text-center"><span className="font-bold text-spray-800 text-2xl mx-1">{((data?.totalNutrientsKCal?.PROCNT_KCAL?.quantity)/(data?.calories)*100).toFixed(1)}%</span>  of which comes from <b>Protein</b>,</h1>
                    <h1 className="font-extralight leading-snug text-xl m-2 text-center"><span className="font-bold text-spray-800 text-2xl mx-1">{((data?.totalNutrientsKCal?.FAT_KCAL?.quantity)/(data?.calories)*100).toFixed(1)}%</span>  from <b>Fat</b>, and</h1>
                    <h1 className="font-extralight leading-snug text-xl m-2 text-center"><span className="font-bold text-spray-800 text-2xl mx-1">{((data?.totalNutrientsKCal?.CHOCDF_KCAL?.quantity)/(data?.calories)*100).toFixed(1)}%</span>  from <b>Carbohydrates</b>. Yum!</h1>
                </div>
                <div className="sm:w-1/3 m-auto mt-10 drop-shadow-xl cursor-pointer transition ease-in-out hover:scale-105">
                    <Pie
                        datasetIdKey='macro'
                        data={{
                            labels: ["Protein", "Fat", "Carbohydrates"],
                            datasets: [
                                {
                                    id: 1,
                                    label: '%',
                                    data: [ ((data?.totalNutrientsKCal?.PROCNT_KCAL?.quantity)/(data?.calories)*100), 
                                            ((data?.totalNutrientsKCal?.FAT_KCAL?.quantity)/(data?.calories)*100),
                                            ((data?.totalNutrientsKCal?.CHOCDF_KCAL?.quantity)/(data?.calories)*100)
                                        ],
                                    backgroundColor: ["rgb(18 93 93)", "rgb(18 50 80)", "rgb(18 200 150)"]
                                },
                            ],  
                        }}
                    />
                </div>
            </div>
            <div className="m-20 snap-start">
                <h1 className="font-extralight leading-snug text-2xl m-5 mt-6 text-center">As part of your day-to-day meals, this plate fulfills a certain amount of <br/>your daily nutritional requirement*. Let's take a look!</h1>
                <p className="font-extralight leading-snug text-md text-center">*Percent Daily Values are based on a 2000-calorie diet</p>
            </div>
            <div className="p-5">
                <Bar
                    datasetIdKey='micro'
                    data={{
                        labels: barLabel,
                        datasets: [
                            {
                                id: 1,
                                label: '%',
                                data: barValue,
                                backgroundColor: ["rgb(18 50 80)", "rgb(18 93 93)", "rgb(18 200 150)", "rgb(150 250 200)"]
                            },
                        ],  
                }}
                />
            </div>
            <div className="m-20 snap-start">
                <h1 className="font-extralight leading-snug text-2xl m-5 mt-6 text-center">You've fulfilled the daily recommended intake of the following nutrients: </h1>
                <div className="flex flex-row justify-center items-center flex-wrap">
                    {nutrientOver100Element}
                </div>
                <h1 className="font-extralight leading-snug text-2xl m-5 mt-6 text-center">Good job! But remember that moderation is key. </h1>
            </div>
            <div className="m-20 snap-start">
                <h1 className="font-extralight leading-snug text-2xl m-5 mt-6 text-center">...and here are the specific nutrients you can afford to have more of for the day.</h1>
            </div>
            <div className="p-5">
                <Bar
                    datasetIdKey='micro-sub100'
                    data={{
                        labels: barLabelSub100,
                        datasets: [
                            {
                                id: 1,
                                label: '%',
                                data: barValueSub100,
                                backgroundColor: ["rgb(18 50 80)", "rgb(18 93 93)", "rgb(18 200 150)", "rgb(150 250 200)"]
                            },
                        ],  
                }}
                />
            </div>
            <div className="m-20 snap-start">
                <h1 className="font-extralight leading-snug text-2xl m-5 mt-6 text-center">Looks like your plate could especially use a bit of: </h1>
                <div className="flex flex-row justify-center items-center flex-wrap">
                    {nutrientSub10Element}
                </div>
            </div>
            <div className="m-20 snap-start">
                <h1 className="font-extralight leading-snug text-2xl m-5 mt-6 text-center">How healthy is the plate, you ask? <br/> It has all this going for it:</h1>
                <div className="flex flex-row justify-center items-center flex-wrap">
                    {healthyDietElement}
                </div>
            </div>
            <div className="m-20 snap-start">
                <h1 className="font-extralight leading-snug text-2xl m-5 mt-6 text-center">As long as you're mindful of what's on your plate, you'll do just fine. Go get 'em champ!</h1>
            </div>
            <div className="m-20 text-center snap-start">
                <button
                    type="button"
                    className="text-white bg-spray-600 hover:bg-spray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-5"
                    onClick={handleNavigate}
                >
                    Create a new plate
                </button>
            </div>
        </div>
        </>
    )
}