import { useNavigate } from "react-router-dom";

export default function IndivPlate ({plate, handleNutrition, plateId, handleScrollToSection, calories}) {

    const navigate = useNavigate();

    const ingredientElement = plate.map((ingr, index) => {
        return (
                <p key={index} className="font-normal text-right">
                    {ingr}
                </p>
            )
        });

    const handleNutritionIndiv = () => {
        handleNutrition(plate);
        handleScrollToSection();
    }

    const handleUpdatePlate = () => {
        navigate(`/updatePlate/${plateId}`);
    }

    return(
        <div 
            onClick={handleNutritionIndiv}
            className="flex flex-row items-center m-3 rounded-3xl bg-emerald-50 shadow-md border-4 border-gray-200 cursor-pointer transition ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-red-200"
        >
            <img src="/svg/plate.svg" className="m-0 relative w-12 bottom-10 right-5 drop-shadow-md"/>
            <div className="flex flex-col justify-between pl-0">
                <div className="p-5">
                    {ingredientElement}
                    <p className="font-semibold font-mono italic text-spray-800 tracking-tighter text-right">{calories} kcal</p>
                </div>
                <div className="text-right">
                    <button onClick={handleUpdatePlate} className="text-white text-sm bg-teal-500 hover:bg-teal-600 font-semibold w-fit p-2 px-3 m-2 rounded-full">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}