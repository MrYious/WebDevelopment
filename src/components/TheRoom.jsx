import { Link, Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/UserContext";

const TheRoom = () => {

    const contextData = useContext(UserContext);
    const [nickname, setNickname] = useState(contextData.user.nickname ? contextData.user.nickname: "Mark" );

    let  {roomID, userID}  = useParams();
    return (<>
        <div className='flex flex-col items-center justify-center h-screen bg-gray-300'>
            <div className="flex items-center justify-between w-full gap-1 px-3 py-3 text-white bg-gray-700 border-b-2 border-gray-500 text-back">
                <div className="text-xl ">
                    SmartQ
                </div>
                <div className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-100 rounded-full bg-emerald-500 w-fit">
                    { userID }
                </div>
            </div>
            <div className="flex items-center justify-between w-full h-full gap-10 p-5 text-center ">
                <div className="flex justify-center w-1/6 font-bold ">
                    <div className='p-8 text-5xl text-gray-200 bg-green-700 rounded-full shadow-md w-fit shadow-green-800'>
                        60
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full h-full gap-6'>
                    <div className='flex items-center justify-center w-full py-5 text-3xl text-white bg-gray-700 rounded-full shadow-md px-7 h-2/5 shadow-black'>
                        In a website browser address bar, what does “www” stand for ?
                    </div>
                    <div className='flex flex-wrap items-center justify-center w-full gap-5 text-xl '>
                        <div className='flex w-2/5 text-white bg-blue-800 rounded-full shadow-md cursor-pointer shadow-black ' >
                            <div className='p-5 font-bold'>A</div>
                            <div className='flex items-center justify-center w-full text-center'>Wed Wine World</div>
                        </div>
                        <div className='flex w-2/5 text-white bg-red-800 rounded-full shadow-md cursor-pointer shadow-black' >
                            <div className='p-5 font-bold'>B</div>
                            <div className='flex items-center justify-center w-full text-center'>World Wide Web</div>
                        </div>
                        <div className='flex w-2/5 text-white bg-yellow-800 rounded-full shadow-md cursor-pointer shadow-black' >
                            <div className='p-5 font-bold'>C</div>
                            <div className='flex items-center justify-center w-full text-center'>Word Wide Will</div>
                        </div>
                        <div className='flex w-2/5 text-white bg-green-800 rounded-full shadow-md cursor-pointer shadow-black' >
                            <div className='p-5 font-bold'>D</div>
                            <div className='flex items-center justify-center w-full text-center'>Wide Web World</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center w-1/6 font-bold">
                    <div className='text-6xl w-fit '>
                        0
                    </div>
                    <div className='text-lg w-fit '>
                        answers
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between w-full gap-2 px-3 py-2 bg-gray-700">
                <div className='w-2/6 px-4 py-1 font-medium text-gray-200 text-md'>
                    Points: <b className="text-emerald-400">{300}</b>
                </div>
                <div className='w-full px-4 py-1 font-medium text-center text-gray-200 text-md'>
                    1 / 20
                </div>
                <div className="w-2/6 px-4 py-1 font-medium text-right text-gray-200 text-md">
                    Room Code: <b onClick={() => navigator.clipboard.writeText(roomID)} className="cursor-pointer text-emerald-300">{roomID}</b>
                </div>
            </div>
        </div>
    </>);
}

export default TheRoom;