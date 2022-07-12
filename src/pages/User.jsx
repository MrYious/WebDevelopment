import { Outlet } from "react-router-dom";

const User = () => {

    return (<>
        <div className=" h-full bg-amber-100 p-10">
            <div className="flex justify-between h-full">
                {/* TEXT */}
                <div className="flex flex-col p-3 w-3/6 bg-gray-300 gap-10">
                    <div className="font-medium text-5xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, odit!</div>
                    <div className="font-medium text-2xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt sapiente placeat, exercitationem ipsam, ad ut corrupti eligendi cum dignissimos accusamus reiciendis ipsum doloribus alias rerum eos! Explicabo ea quam vitae aliquid nobis, sapiente magni, beatae doloremque asperiores delectus natus dolore.</div>
                </div>
                {/* CONTAINER */}
                <div className="w-2/6 border-2 border-solid border-stone-600">
                    <Outlet/>
                </div>
            </div>
        </div>
    </>);
}

export default User;