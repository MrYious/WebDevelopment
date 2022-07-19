import { Link, useNavigate } from 'react-router-dom';

import { HomeIcon } from '@heroicons/react/solid'
import { useState } from 'react';

const allowedChars = (str) => {
    return /^[A-Za-z0-9-]*$/.test(str);
}

const Landing = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [roomCode, setRoomCode] = useState('');

    const handleClickEnter = () => {
        if(roomCode.length === 7 & allowedChars(roomCode)){
            navigate("quiz/" + roomCode)
        }else{
            setMessage("Join the challenge by entering a valid room code!");
        }
    };

    return (<>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
            {/* NAVBAR */}
            <div className="flex items-center justify-end w-full px-3 py-2">
                <Link to={'home'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-200 bg-gray-700 rounded-full w-fit">
                    <HomeIcon className="h-7 w-7"/>
                    Home
                </Link>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col items-center justify-center w-full h-full gap-10 text-center">
                <div className="text-6xl font-bold text-gray-700">SmartQ</div>
                {/* Room Code */}
                <div className='flex flex-col gap-3 p-4 text-center bg-gray-100 rounded-lg w-96'>
                    { message && <div> {message} </div>}
                    <input className='py-2 text-xl text-center bg-gray-100 border-2 border-gray-700 rounded-lg' maxLength={7} type={"text"} placeholder={"Room Code"} value={roomCode} onChange={e => setRoomCode(e.target.value)}/>
                    <button className='w-full py-2 text-xl font-bold text-gray-200 bg-orange-700 rounded-lg' onClick={handleClickEnter}>
                        ENTER
                    </button>
                </div>
            </div>
        </div>
    </>);
}

export default Landing;