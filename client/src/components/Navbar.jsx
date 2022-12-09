import { useNavigate, Link } from "react-router-dom"

export default function Navbar () {
    const navigate = useNavigate();

    return(
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-around">
                <div className="flex justify-around items-baseline space-x-4">
                    <Link to="/home" className="text-gray-500 hover:bg-spray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Home</Link>
                    <Link to="/addAPlate" className="text-gray-500 hover:bg-spray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Add A Plate</Link>
                    <Link to="/userPlates" className="text-gray-500 hover:bg-spray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">User's Plates</Link>
                    <Link to="/userProfile" className="text-gray-500 hover:bg-spray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Profile</Link>
                </div>
            </div>
        </div>
    )
}