import Axios from "../service/Axios"
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const allowedChars = (str) => {
        return /^[A-Za-z0-9_ ]*$/.test(str);
    }

    const reset = () => {
        setNickname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setIsSuccess(false);
    }

    const handleSubmit = (e) => {
        if(!allowedChars(nickname)){
            setMessage('Nickname only allows spaces and underscores')
        }else{
            Axios.post('http://localhost:5000/user/register', {
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
            })
            .catch(function (error) {
                // FAIL
                if(error.response.data){
                    setMessage(error.response.data.msg);
                }else{
                    setMessage("Can't reach server");
                }
            });
        }
        e.preventDefault();
    }

    return (<>
        <div className="flex flex-col items-center justify-center w-full h-full gap-3 px-16 py-6 bg-gray-300">
            <div className="flex flex-col items-center justify-center">
                <UserCircleIcon className="w-20 my-2 text-orange-600"/>
                <div className="text-3xl ">
                    Hello new guy!
                </div>
            </div>
            {/* Input */}
            <div className="flex flex-col items-center justify-center w-full gap-3 text-lg ">
                { message &&
                    <div className={ isSuccess ? "px-4 py-1 rounded-full text-xs bg-green-400 text-center" : "px-4 py-1 rounded-full text-xs bg-red-400 text-center"}>
                        {message}
                    </div>
                }
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full gap-3">
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={nickname} onChange={(e)=> {setNickname(e.target.value)}} type={"text"} maxLength="15" placeholder="Nickname" required autoComplete="username"/>
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={email} onChange={(e)=> {setEmail(e.target.value)}} type={"email"} maxLength="50" placeholder="Email" required autoComplete="email"/>
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={password} onChange={(e)=> {setPassword(e.target.value)}} type={"password"} maxLength="15" placeholder="Password" required autoComplete="new-password"/>
                    <input className="w-full px-2 py-1 border-2 border-gray-400 border-solid rounded-sm bg-slate-100" value={confirmPassword} onChange={(e)=> {setConfirmPassword(e.target.value)}} type={"password"} maxLength="15" placeholder="Confirm Password" required autoComplete="new-password"/>
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