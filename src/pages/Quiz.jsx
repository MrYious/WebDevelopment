import { BackspaceIcon, HomeIcon } from '@heroicons/react/solid'
import { Link, Navigate, Outlet, useParams } from 'react-router-dom';

import { useState } from 'react';

const Quiz = () => {
    // Quiz room states = Created and Saved, Running and Waiting, Started, Ended


    // Get the roomID param from the URL.
    // Check if it's valid (by checking the database if it is running or checking the socket if there is one running)
        // Using the roomId check if there is a matched session data for isJoined
            //setIsJoined = true, get session quiz and user data, connect it to the socket

            //setIsJoined = false, setIsValidRoom = false, check if the user is logged in thru session nickname
                //true | nickname = "insert" -> preparation, check if the room already starts
                //prompt user to enter nickname ->

                    //setIsJoined = true, redirect to the Room

        // setIsValidRoom = false, show that the room is invalid or expired
        // GO BACK

    let { roomID } = useParams();

    const [message, setMessage] = useState('');

    const [nickname, setNickname] = useState('MrYious');//
    const [tempName, setTempName] = useState('');

    const [isJoined, setIsJoined] = useState(true);//
    const [isValidRoom, setIsValidRoom] = useState(true);//
    const [isStarted, setIsStarted] = useState(true);//

    const allowedChars = (str) => {
        return /^[A-Za-z0-9_ ]*$/.test(str);
    }

    const handleClickJoin = () => {
        console.log('Join: clicked');
        console.log('Nickname: ', tempName)
        if(tempName.length < 2 ){
            setMessage("Sorry 🥺 but it should be at least 2 chars long")
        }else if(!allowedChars(tempName)){
            setMessage("Sorry 🥺 but we only allow letters, numbers, spaces, and underscores")
        }else{
            setNickname(tempName);
        }
    };

    const handleGoBack = () => {
        setNickname('');
    }

    return(<>
        { isJoined
        ?   <><Outlet/><Navigate to={nickname}/></>
        :   <div className='flex flex-col items-center justify-center h-screen bg-gray-300'>
                {
                    isValidRoom
                    ?
                        <>
                            {/* HEADER */}
                            <div className="flex items-center justify-between w-full gap-1 px-3 py-2">
                                <div className='flex gap-2'>
                                    <div className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-gray-700 rounded-full">
                                        {nickname ? nickname : "Guest"}
                                    </div>
                                    <div className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-gray-700 rounded-full cursor-pointer" onClick={() => navigator.clipboard.writeText(roomID)}>
                                        {roomID}
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <Link to={'/'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-200 bg-red-800 rounded-full w-fit">
                                        <BackspaceIcon className="h-7 w-7"/>
                                    </Link>
                                    <Link to={'/home'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-200 bg-red-800 rounded-full w-fit">
                                        <HomeIcon className="h-7 w-7"/>
                                    </Link>
                                </div>
                            </div>
                            {/* CONTENT */}
                            <div className="flex flex-col items-center justify-center w-full h-full gap-10 text-center">
                                <div className="text-6xl font-bold text-gray-700">SmartQ</div>
                                {(
                                        !nickname
                                    ?
                                        // Nickname
                                        <div className='flex flex-col gap-3 p-4 bg-gray-200 rounded-lg w-96'>
                                            { message && <div> {message} </div> }
                                            <input className='py-2 text-xl text-center border-2 border-gray-700 rounded-lg' maxLength={15} type={"text"} placeholder={"Nickname"} value={tempName} onChange={e => setTempName(e.target.value)}/>
                                            <button className='w-full py-2 text-xl font-bold text-gray-200 bg-orange-700 rounded-lg' onClick={handleClickJoin}>
                                                JOIN
                                            </button>
                                        </div>
                                    :
                                        // Preparation Room
                                        <div className='flex flex-col gap-3 p-4 bg-gray-200 rounded-lg w-96'>
                                            <div className='py-2 text-xl' >
                                            { isStarted
                                                    ? <>The party started!</>
                                                    : <>The crew is waiting!</>
                                                }
                                            </div>
                                            <div className='py-2 text-xl' >
                                                { isStarted
                                                    ? <><b>{nickname}</b>, wanna catch up?</>
                                                    : <>Ready to join the party, <b>{nickname}</b>?</>
                                                }
                                            </div>
                                            <button className='w-full py-2 text-xl font-bold text-gray-200 bg-gray-600 rounded-lg' onClick={handleGoBack}>
                                                CHANGE NICKNAME
                                            </button>
                                            <Link to={nickname} onClick={() => {setIsJoined(true)}} className='w-full py-2 text-xl font-bold text-gray-200 bg-orange-700 rounded-lg'>
                                                LET'S GO
                                            </Link>
                                        </div>
                                )}
                            </div>
                        </>
                    :
                        // INVALID PAGE
                        <div className="flex flex-col items-center justify-center w-2/6 gap-3 text-center bg-gray-300">
                            <div className="py-7 text-8xl">Oops!</div>
                            <div className="text-xl">The room you are trying to access is <b className='text-red-600'>invalid</b>  or has <b className='text-red-600'>already expired</b>.</div>
                            <div className="text-xl">Double check the link or contact your host</div>
                            <Link to={'/'} className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-orange-700 rounded-full cursor-pointer" onClick={() => navigator.clipboard.writeText(roomID)}>
                                Go Back
                            </Link>
                        </div>
                }
            </div>
        }
    </>)
}

export default Quiz;