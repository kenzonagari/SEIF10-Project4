export default function Header () {
    return(
        <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between border-b-2 py-6 mb-8 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                <span className="sr-only">Your Company</span>
                </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
                <button type="button" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                </button>
            </div>
            {/* <nav className="hidden space-x-10 md:flex">
                <div className="relative">
                    <button type="button" className="text-gray-500 group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" aria-expanded="false">
                        <span>Solutions</span>
                        <svg className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">Pricing</a>
                <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">Docs</a>
            </nav> */}
            <div>
                <h1>SimplrSamplr</h1>
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