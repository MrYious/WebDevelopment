import { Link, useNavigate } from "react-router-dom";

import Axios from "../service/Axios"
import { UserCircleIcon } from "@heroicons/react/outline";
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
        Axios.post('http://localhost:5000/user/login', {
            email,
            password,
          })
          .then(function (response) {
            // SUCCESS
            reset();
            console.log(response.data.msg);
            navigate("/host")
          })
          .catch(function (error) {
            // FAIL
            if(error.response.data){
                setErrorMessage(error.response.data.msg);
            }else{
                setErrorMessage("Can't reach server");
            }
            setIsValidationError(true);
        });

        e.preventDefault();

    }

    return (<>
        <div className="flex flex-col items-center justify-center w-full h-full gap-5 px-16 py-10 bg-gray-300 rounded-3xl">
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
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" maxLength="50" value={email} onChange={(e)=> {setEmail(e.target.value)}} type={"email"} placeholder="Email" autoComplete="email" required/>
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" maxLength="15" value={password} onChange={(e)=> {setPassword(e.target.value)}} type={"password"} placeholder="Password" autoComplete="current-password"  required/>
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