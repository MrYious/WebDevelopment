import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [isValidationError, setIsValidationError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const reset = () => {
        setNickname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setIsValidationError(false);
        setIsSuccess(false);
    }

    const handleSubmit = (e) => {
        axios.post('http://localhost:5000/user/register', {
            nickname,
            email,
            password,
            confirmPassword,
          })
          .then(function (response) {
            // SUCCESS
            reset();
            console.log(response.data.msg);
            setMessage(response.data.msg);
            setIsSuccess(true);
            setIsValidationError(true);
          })
          .catch(function (error) {
            // FAIL
            console.log(error.response.data.msg);
            setMessage(error.response.data.msg);
            setIsValidationError(true);
        });
        e.preventDefault();
    }

    return (<>
        <div className="flex flex-col items-center justify-center w-full h-full gap-5 px-16 bg-gray-300 py-9">
            <div className="flex flex-col items-center justify-center">
                <UserCircleIcon className="w-20 my-2 text-orange-600"/>
                <div className="text-3xl ">
                    Hello new guy!
                </div>
            </div>
            {/* Input */}
            <div className="flex flex-col items-center justify-center w-full gap-3 text-lg ">
                { isValidationError &&
                    <div className={ isSuccess ? "px-4 py-1 rounded-full text-xs bg-green-400 text-center" : "px-4 py-1 rounded-full text-xs bg-red-400 text-center"}>
                        {message}
                    </div>
                }
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full gap-3">
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={nickname} onChange={(e)=> {setNickname(e.target.value)}} type={"text"} maxlength="15" placeholder="Nickname" required/>
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={email} onChange={(e)=> {setEmail(e.target.value)}} type={"email"} maxlength="50" placeholder="Email" required/>
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={password} onChange={(e)=> {setPassword(e.target.value)}} type={"password"} maxlength="15" placeholder="Password" required/>
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={confirmPassword} onChange={(e)=> {setConfirmPassword(e.target.value)}} type={"password"} maxlength="15" placeholder="Confirm Password" required/>
                    <button type="submit" className="w-full py-2 font-bold tracking-wide text-gray-300 bg-orange-600 rounded-sm">
                        Sign Up
                    </button>
                </form>
            </div>
            <div className="tracking-normal">
                <span>Already a member? </span>
                <Link to='/home/user' className="text-orange-600 ">
                    Just sign in
                </Link>
            </div>
        </div>
    </>);
}

export default SignUp;