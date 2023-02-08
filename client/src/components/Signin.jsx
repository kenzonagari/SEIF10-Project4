import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

const warningText = {
    emailNotFound: "Email address or username not found. Please check and try again.",
    incorrectPassword: "Incorrect password. Please try again.",
}

export default function SignIn() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisableButton(true);

        let myFormData = new FormData(event.target);
        let userLoginObj = Object.fromEntries(myFormData.entries());
        let loginIsValid = false;

        loginIsValid = true;

        //* only fire off request when input is valid:
        if(loginIsValid){
            fetch('/api/userlogin/signin', {    method: "POST", 
                                                headers: {
                                                    "Content-type": "application/json" //* vvvvv important, otherwise server receives empty object
                                                },
                                                body: JSON.stringify(userLoginObj) 
                                    })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.msg === "Email not found"){
                        setError(warningText.emailNotFound);
                        setDisableButton(false);
                    } else 
                    if(data.msg === "Incorrect password"){
                        setError(warningText.incorrectPassword);
                        setDisableButton(false);
                    } else 
                    if(data.msg === "Redirecting to /home"){
                        setError("");
                        localStorage.setItem("token", data.authToken);
                        return navigate("/home");
                    } else
                    if(data.msg === "Redirecting to /createProfile"){
                        setError("");
                        localStorage.setItem("token", data.authToken);
                        return navigate("/createProfile");
                    }
                })
        } else {
            setError("no input");
            setDisableButton(false);
        }
    }

    const warningPopup = 
        <div id="passwordHelpBlock" className="form-text text-danger">
            {   error === warningText.emailNotFound ? error :
                error === warningText.incorrectPassword ? error : ""
            }
        </div>;

    return (
    <>
        <Header signedIn={false}/>
        <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account.
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                or{' '}
            <Link to="/signUp">
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign Up here.
                </span>
            </Link>
            </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
                <div>
                <label htmlFor="email-address" className="sr-only">
                    Email address
                </label>
                <input
                    id="email-address"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email or Username"
                />
                </div>
                <div>
                <label htmlFor="password" className="sr-only">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                />
                </div>
            </div>

            <div className="text-center text-sm text-red-500">
                {error === warningText.emailNotFound ? warningPopup : ""}
                {error === warningText.incorrectPassword ? warningPopup : ""}
            </div>

            <div className="text-center">
                <button
                type="submit"
                disabled={disableButton}
                className="group relative flex w-fit justify-center m-auto rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                Sign In
                </button>
            </div>

            </form>
        </div>
        </div>
    </>
    )
}