import { Outlet } from "react-router-dom";
import logo from "../assets/SmartQ.png"

const User = () => {

    return (<>
        <div className="flex justify-between w-full h-full px-32 py-10 bg-gradient-to-r from-emerald-800 to-green-800">
            {/* TEXT */}
            <div className="flex flex-col items-center justify-center w-3/6 p-3 text-center gap-9 ">
                <img src={logo} alt="logo" width={'85%'}/>
                <div className="text-3xl font-medium text-white">Host your own quiz and assess anyone's skills, competencies, knowledge and more!</div>
            </div>
            {/* CONTAINER */}
            <div className="flex items-center justify-center w-2/5 text-black border-solid border-stone-600 rounded-3xl">
                <Outlet/>
            </div>
        </div>
    </>);
}

export default User;