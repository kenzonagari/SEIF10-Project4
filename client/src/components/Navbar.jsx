export default function Navbar () {
    return(
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-around">
                <div className="flex justify-around items-baseline space-x-4">
                    <a href="#" className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Home</a>
                    <a href="#" className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">User's Plates</a>
                    <a href="#" className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Check Nutrition</a>
                    <a href="#" className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Profile</a>
                </div>
            </div>
        </div>
    )
}