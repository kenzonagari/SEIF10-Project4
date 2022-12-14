import measurementUnit from "./foodMeasurementUnit";

export default function IndivIngredientInput ({num, ingredients}) {
    let foodItemStr = "";

    if(ingredients){
        for(let i = 0; i < ingredients.length ; i++){
            if(i > 1){
                foodItemStr += ingredients[i];
                if(i !== ingredients.length-1){
                    foodItemStr += " ";
                }
            }
        }
    }
    const measurementElement = measurementUnit.map((unit, index) => {
        return(
            <option value={unit} key={index}>{unit}</option>
        )
    });

    return(
        <div className="grid md:grid-cols-4 md:gap-6 my-2">
            <div className="col-span-2">
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredient</label>
                <input required type="text" id="ingredient" name={`ingredient-${num}`} placeholder="e.g. rice, chicken, apple..." defaultValue={ingredients? foodItemStr : ""} className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="">
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                <input required type="number" id="amount" name={`amount-${num}`} placeholder="e.g. 1" defaultValue={ingredients? parseFloat(ingredients[0]).toFixed(1) : ""} step="any" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="">
                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                <select required id="unit" name={`unit-${num}`} className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={ingredients? ingredients[1] : ""}>{ingredients? ingredients[1] : ""}</option>
                    {measurementElement}
                </select>
            </div>
        </div>
    )
}