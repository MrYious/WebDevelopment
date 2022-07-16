import { Link } from "react-router-dom";

const Hero = () => {

    return (<>
        <div className="flex w-full h-full bg-slate-400">
            <div>Hero Banner</div>
            <Link to='/'>
                <button className="px-4 py-2 font-bold text-black bg-orange-600 rounded-3xl">
                Join a quiz
                </button>
            </Link>
        </div>
    </>);
}

export default Hero;