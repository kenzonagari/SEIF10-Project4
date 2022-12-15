import { Link, useNavigate } from "react-router-dom"

export default function Header ({signedIn}) {

    const navigate = useNavigate();
    
    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/signUp");
    }

    return(
        <div className="relative bg-emerald-50">
            <div className="p-2  sm:px-6">
                <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                    <Link to="/home">
                        <div className="-my-2 -mr-2">
                            <h1 className="text-gray-700 hover:drop-shadow text-4xl font-normal tracking-tighter leading-none text-gray-900-900 md:text-5xl lg:text-5xl dark:text-white">GudFud</h1>
                        </div>
                    </Link>

                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        {!signedIn ?
                        <>
                            <Link to="/signIn">
                                <div className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Sign In</div>
                            </Link>
                            <Link to="/signUp">
                                <div className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Sign Up</div>
                            </Link>
                        </> :
                        <div onClick={handleSignOut} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 px-4 cursor-pointer">Sign Out</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}