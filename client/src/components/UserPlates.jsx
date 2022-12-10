import IndivPlate from "./indivPlate"

const seed = [
    ["1 kg salmon", "1 g rice"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 kg salmon", "1 g rice", "10 g oat"],
    ["1 kg salmon", "1 g rice", "1 L milk"]
]
export default function UserPlates () {

    const plateElement = seed.map((plate, index) => {
        return(
            <IndivPlate plate={plate} key={index}/>
        )
    })

    return(
        <div className="bg-white w-3/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl">
            <h1 className="font-semibold leading-snug text-4xl mt-0 mb-3 text-center">User's Plates</h1>
            <div className="flex flex-row flex-wrap">
                {plateElement}
            </div>
        </div>
    )
}