import { Outlet } from "react-router-dom";

const User = () => {

    return (<>
        <div className="flex justify-between w-full h-full p-10 bg-slate-400">
            {/* TEXT */}
            <div className="flex flex-col w-3/6 gap-10 p-3">
                <div className="text-5xl font-medium">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, odit!</div>
                <div className="text-2xl font-medium">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt sapiente placeat, exercitationem ipsam, ad ut corrupti eligendi cum dignissimos accusamus reiciendis ipsum doloribus alias rerum eos! Explicabo ea quam vitae aliquid nobis, sapiente magni, beatae doloremque asperiores delectus natus dolore.</div>
            </div>
            {/* CONTAINER */}
            <div className="flex items-center justify-center w-2/6 border-solid border-stone-600">
                <Outlet/>
            </div>
        </div>
    </>);
}

export default User;