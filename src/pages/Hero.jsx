import { Link } from "react-router-dom";

const Hero = () => {

    return (<>
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-400">
            <div>Hero Banner</div>
            <Link to={'/'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-200 bg-orange-700 rounded-full w-fit">
                Join a quiz
            </Link>
        </div>
    </>);
}

export default Hero;