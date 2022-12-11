import { useEffect } from "react"

export default function UserProfile ({handleImageSrc}) {

    const handleImageSrcProps = () => {
        handleImageSrc("/SVG/salmonbowl.svg");
    }
    handleImageSrcProps();

    return(
        <div className="bg-white w-3/5 h-fit p-10 mx-2 rounded-xl border border-gray-200 shadow-xl">
            <h1 className="font-semibold leading-snug text-4xl mt-0 mb-3 text-center">User Profile</h1>
        </div>
    )
}