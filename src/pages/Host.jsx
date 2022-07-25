import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Axios from "../service/Axios"
import { UserContext } from "../context/UserContext";

const Host = () => {

    let navigate = useNavigate();

    const contextData = useContext(UserContext);
    console.log("Render Host", contextData);

    const [message, setMessage] = useState('')

    useEffect(() => {
        console.log("Host Effect:");
        contextData.toggleCheckLogin();
    }, [])

    const handleSignOut = () => {
        console.log("Clicked Sign out");
        Axios.get('http://localhost:5000/user/logout')
        .then(function (response) {
            // SUCCESS
            contextData.toggleLogout()
            navigate("/")
        })
        .catch(function (error) {
            // FAIL
            console.log(error);
        });
    }

    return (<>
        <div className='flex flex-col items-center justify-center h-screen bg-gray-300'>
            <div className="flex items-center justify-between w-full gap-1 px-3 py-3 bg-gray-400 border-b-2 border-gray-500 text-back">
                <div className="text-xl ">
                    Hello, <b>{ contextData.user.nickname ? contextData.user.nickname : "Guest"}</b>
                </div>
                <button onClick={handleSignOut} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-200 bg-red-800 rounded-full w-fit">
                    Sign out
                </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full gap-10 overflow-y-auto text-center ">
                <Outlet context={[message, setMessage]}/>
            </div>
            <div className="flex items-center justify-between w-full gap-2 px-3 py-2 bg-gray-700">
                <div className="px-4 py-1 font-medium text-gray-200 text-md">
                    {message}
                </div>
            </div>
        </div>
    </>);

}

export default Host;