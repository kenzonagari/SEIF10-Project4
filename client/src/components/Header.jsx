export default function Header () {
    return(
        <div className="relative">
            <div className="p-2  sm:px-6">
                <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                    {/* <div className="-my-2 -mr-2 ">
                        <button type="button" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div> */}
                    <div className="-my-2 -mr-2">
                        <h1 className="text-4xl font-extralight tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl dark:text-white">GudFud</h1>
                    </div>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <a href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Sign in</a>
                        <a href="#" className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    )
}