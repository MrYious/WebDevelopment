import EnterRoom from '../components/EnterRoom';
import { HomeIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Landing = () => {

    const contextData = useContext(UserContext);
    console.log("Render Landing", contextData);

    useEffect(() => {
        console.log("Landing Effect:");
        contextData.toggleCheckLogin();
    }, [])

    return (<>
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-emerald-800 to-green-800">
            {/* NAVBAR */}
            <div className="flex items-center justify-between w-full px-3 py-2">
                <div className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-[#082b17] shadow-sm shadow-black rounded-full">
                    {contextData.isLoggedIn ? contextData.user.nickname : "Guest"}
                </div>
                <Link to={'home'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-200 bg-[#082b17] shadow-sm shadow-black rounded-full w-fit">
                    <HomeIcon className="h-7 w-7"/>
                    Home
                </Link>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col items-center justify-center w-full h-full gap-10 text-center">
                <div className="text-6xl font-bold text-gray-100">SmartQ</div>
                {/* Room Code */}
                <EnterRoom/>
            </div>
        </div>
    </>);
}

export default Landing;