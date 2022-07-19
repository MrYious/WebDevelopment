import { Link, useNavigate } from "react-router-dom";

import { UserCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useState } from "react";

const SignIn = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [isValidationError, setIsValidationError] = useState(false);

    const reset = () => {
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setIsValidationError(false);
    }

    const handleSubmit = (e) => {
        axios.post('http://localhost:5000/user/login', {
            email,
            password,
          })
          .then(function (response) {
            // SUCCESS
            reset();
            console.log(response.data.msg);
            alert("SUCCESS");
          })
          .catch(function (error) {
            // FAIL
            console.log(error.response.data.msg);
            setErrorMessage(error.response.data.msg);
            setIsValidationError(true);
        });

        e.preventDefault();

    }

    return (<>
        <div className="flex flex-col items-center justify-center w-full h-full gap-5 px-16 py-10 bg-gray-300">
            <div className="flex flex-col items-center justify-center">
                <UserCircleIcon className="w-20 my-2 text-orange-600"/>
                <div className="text-3xl ">
                    Welcome again!
                </div>
            </div>
            {/* Input */}
            <div className="flex flex-col items-center justify-center w-full gap-3 text-lg">
                { isValidationError &&
                    <div className="px-4 py-1 text-xs text-center bg-red-400 rounded-full">
                        {errorMessage}
                    </div>
                }
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full gap-3">
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={email} onChange={(e)=> {setEmail(e.target.value)}} type={"email"} size="70" placeholder="Email" required/>
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={password} onChange={(e)=> {setPassword(e.target.value)}} type={"password"} size="15" placeholder="Password" required/>
                    <button type="submit" className="w-full py-2 font-bold tracking-wide text-gray-300 bg-orange-600 rounded-sm">
                        Sign In
                    </button>
                </form>
            </div>
            <div className="tracking-normal">
                <span>Not yet a member? </span>
                <Link to='/home/user/new' className="text-orange-600 ">
                    Sign up now
                </Link>
            </div>
        </div>
    </>);
}

export default SignIn;