import { Link } from "react-router-dom";
import hero from "../assets/hero.png"

const Hero = () => {

    return (<>
        <div className="flex items-center justify-between w-full h-full gap-10 px-32 bg-gradient-to-r from-emerald-800 to-green-800">
            <div className="flex flex-col w-3/5 gap-5">
                <div className="text-4xl italic font-medium leading-relaxed text-white">
                    SmartQ is a flexible quiz maker for work, education or fun. Easily create, share and complete quizzes with everyone.
                </div>
                <Link to={'/'} className="flex items-center gap-1 px-8 py-4 text-3xl font-medium shadow-md shadow-black text-gray-200 rounded-full bg-[#062614] w-fit">
                    Join a quiz
                </Link>
            </div>
            <img src={hero} alt="hero" width={"40%"}/>
        </div>
    </>);
}

export default Hero;