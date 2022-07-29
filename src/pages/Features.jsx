import icon1 from "../assets/icons/Analytics.png"
import icon2 from "../assets/icons/MultipleUsers.png"
import icon3 from "../assets/icons/QuizFormat.png"
import icon4 from "../assets/icons/QuizTimer.png"
import icon5 from "../assets/icons/Security.png"
import icon6 from "../assets/icons/Share.png"

const Features = () => {

    return (<>
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 bg-gradient-to-r from-emerald-800 to-green-800 ">
            <div className="text-3xl font-bold">Build engaging online quizzes with our top features!</div>
            <div className="flex flex-wrap justify-center items-center w-5/6 py-10 border-2 bg-gradient-to-r from-emerald-700 to-green-700 shadow-md shadow-white border-white rounded-[50px]">
                <div className="flex items-center justify-start w-5/12 gap-5 p-3 mx-5">
                    <img src={icon2} alt="icon2" width={"15%"}/>
                    <div className="text-2xl font-extrabold ">Can handle multiple quiz users</div>
                </div>
                <div className="flex items-center justify-start w-5/12 gap-5 p-3 mx-5">
                    <img src={icon4} alt="icon4" width={"15%"}/>
                    <div className="text-2xl font-extrabold ">Customizable Quiz Timer </div>
                </div>
                <div className="flex items-center justify-start w-5/12 gap-5 p-3 mx-5">
                    <img src={icon3} alt="icon3" width={"15%"}/>
                    <div className="text-2xl font-extrabold ">Multiple Quiz Formats</div>
                </div>
                <div className="flex items-center justify-start w-5/12 gap-5 p-3 mx-5">
                    <img src={icon6} alt="icon6" width={"15%"}/>
                    <div className="text-2xl font-extrabold ">Sharable Quiz Access</div>
                </div>
                <div className="flex items-center justify-start w-5/12 gap-5 p-3 mx-5">
                    <img src={icon1} alt="icon1" width={"15%"}/>
                    <div className="text-2xl font-extrabold ">Results and Analytics</div>
                </div>
                <div className="flex items-center justify-start w-5/12 gap-5 p-3 mx-5">
                    <img src={icon5} alt="icon5" width={"15%"}/>
                    <div className="text-2xl font-extrabold ">Keep Quiz Data Secure</div>
                </div>
            </div>
        </div>
    </>);
}

export default Features;