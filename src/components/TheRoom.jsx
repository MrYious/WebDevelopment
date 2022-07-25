import { Link, Outlet, useParams } from 'react-router-dom';

const TheRoom = () => {

    let  {roomID, userID}  = useParams();
    return (<>
        <div className='flex flex-col items-center justify-center h-screen bg-gray-300'>
            <div className="flex items-center justify-between w-full gap-1 px-3 py-2 bg-gray-500">
                <div className="">
                    Welcome, MrYious
                </div>
                <button>
                    
                </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full gap-10 text-center">
                This is the room
            </div>
        </div>
    </>);
}

export default TheRoom;