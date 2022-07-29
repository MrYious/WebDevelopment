import { useNavigate } from "react-router-dom";
import { useState } from "react";

const allowedChars = (str) => {
    return /^[A-Za-z0-9-]*$/.test(str);
}

const EnterRoom = () => {
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
        <div className='flex flex-col gap-3 p-4 text-center bg-gray-100 rounded-lg shadow-md w-96 shadow-black'>
            { message && <div> {message} </div>}
            <input className='py-2 text-xl text-center bg-gray-100 border-2 border-gray-700 rounded-lg' maxLength={7} type={"text"} placeholder={"Room Code"} value={roomCode} onChange={e => setRoomCode(e.target.value)}/>
            <button className='w-full py-2 text-xl font-bold text-gray-100 bg-green-800 rounded-lg' onClick={handleClickEnter}>
                ENTER
            </button>
        </div>
    </>);
}

export default EnterRoom;