import { useState, useEffect } from "react";

export default function NutritionInfo ({plateIngredients}) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
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
        fetchData();
    
        return () => {
          //   console.log("cleanup");
          controller.abort();
        };

    }, []);

    const ingredientList = plateIngredients.map((ingredient, index) => {
        return(
            <p className="text-center text-lg" key={index}>{ingredient}</p>
        )
    });

    return(
        <>
        <div className="bg-white h-fit w-full m-20 my-10 p-10 rounded-xl border border-gray-200 shadow-xl">
            <h1 className="font-semibold leading-snug text-4xl mt-0 mb-3 text-center">Nutritional Value of:</h1>
            {ingredientList}
        </div>
        </>
    )
}