import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const warningText = {
    usernameTooShort: "Username must have at least 3 characters!",
    passwordMatch: "Password does not match!",
    usernameTaken: "Username already taken!",
    emailTaken: "Email already taken!"
}

export default function SignUp() {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisableButton(true);

        let myFormData = new FormData(event.target);
        let userSignUpObj = Object.fromEntries(myFormData.entries());
        let loginIsValid = false;
        
        //conditionals

        if(userSignUpObj.username.length < 3){
            setError(warningText.usernameTooShort);
            setDisableButton(false);
            return;
        } else 
        if(userSignUpObj.password !== userSignUpObj.confirmPassword){
            setError(warningText.passwordMatch);
            setDisableButton(false);
            return;
        } else {
            delete userSignUpObj.confirmPassword; //remove confirmPassword from object
            loginIsValid = true;
        }

        console.log(userSignUpObj)
        //* only fire off request when input is valid:
        if(loginIsValid){
            fetch('/api/userlogin/signup', {   method: "POST", 
                                        headers: {
                                            "Content-type": "application/json" //* vvvvv important, otherwise server receives empty object
                                        },
                                        body: JSON.stringify(userSignUpObj) 
                                    })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if(data.msg === "Username already taken"){
                        setError(warningText.usernameTaken);
                    } else 
                    if(data.msg === "Email already taken"){
                        setError(warningText.emailTaken);
                    } else 
                    if(data.msg === "Sign up successful"){
                        setError("");
                        return navigate("/signIn");
                    }
                    setDisableButton(false);
                    return;
                })
        } else {
            setError("no input");
            setDisableButton(false);
        }
    }

    const warningPopup = 
        <div id="passwordHelpBlock" className="form-text text-danger">
            {error === warningText.usernameTooShort ? error :
                error === warningText.passwordMatch ? error : 
                error === warningText.usernameTaken ? error :
                error === warningText.emailTaken ? error : ""
            }
        </div>;

    return (
      <>
        <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create an account. <br/> Good food awaits!
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                or{' '}
                <Link to="/signIn">
                    <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign In here.
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
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Username must at least be 3 letters"
                    pattern=".{3,}"
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
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className="text-center text-sm text-red-500">
                {error === warningText.usernameTaken ? warningPopup : ""}
                {error === warningText.usernameTooShort ? warningPopup : ""}
                {error === warningText.emailTaken ? warningPopup : ""}
                {error === warningText.passwordMatch ? warningPopup : ""}
              </div>
  
              <div className="text-center">
                <button
                  type="submit"
                  disabled={disableButton}
                  className="group relative flex w-fit justify-center m-auto rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
  
            </form>
          </div>
        </div>
      </>
    )
  }