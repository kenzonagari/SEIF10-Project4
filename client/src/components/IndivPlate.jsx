export default function IndivPlate ({plate}) {

    const ingredientElement = plate.map((ingr, index) => {
        return (
                <p key={index}>{ingr}</p>
            )
        });

    return(
        <div className="flex flex-row overflow-visible m-5 p-8 rounded-3xl bg-gradient-to-b from-slate-300 to-slate-100">
            <div className="flex flex-col">
                {ingredientElement}
            </div>
        </div>
    )
}