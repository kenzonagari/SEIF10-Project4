export default function IndivPlate ({plate, handleNutrition}) {

    const ingredientElement = plate.map((ingr, index) => {
        return (
                <p key={index} className="font-normal text-right">
                    {ingr}
                </p>
            )
        });

    const handleNutritionIndiv = () => {
        handleNutrition(plate);
    }

    return(
        <div 
            onClick={handleNutritionIndiv}
            className="flex flex-row items-center m-3 rounded-3xl bg-zinc-200 shadow-md border-4 border-gray-100 cursor-pointer transition ease-in-out hover:scale-105"
        >
            <img src="/svg/plate.svg" className="m-0 relative w-12 bottom-10 right-5 drop-shadow-md"/>
            <div className="flex flex-col p-7 pl-0">
                {ingredientElement}
            </div>
        </div>
    )
}