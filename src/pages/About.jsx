const About = () => {

    return (<>
        <div className="flex flex-col items-center justify-center w-full h-full px-20 py-7 bg-gradient-to-r bg-slate-400 from-emerald-800 to-green-800">
            <div className="flex flex-col w-full h-full gap-10">
                <div className="flex flex-col w-full gap-6 h-2/5">
                    <div className="text-6xl font-extrabold">
                        What is SmartQ?
                    </div>
                    <div>
                        <div className="text-xl text-bold border-2 bg-gradient-to-r from-emerald-700 to-green-700 border-white rounded-[20px] shadow-md shadow-white w-4/5 p-10">
                            SmartQ is an online quiz maker website application that is used to easily create quizzes for academic, personal enjoyment, interactive and secured quizzes and tests, and other purposes.
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-6 h-3/5">
                    <div className="text-6xl font-extrabold text-right">
                        Who is it for?
                    </div>
                    <div className="flex justify-end">
                        <div className="text-xl text-bold border-2 bg-gradient-to-r from-emerald-700 to-green-700 border-white rounded-[20px] shadow-md shadow-white w-4/5 p-10">
                            <div>This interactive website is dedicated to everyone.</div>
                            <div className="px-7"><b>Teachers</b>  - to easily host live and interactive quizzes for students.</div>
                            <div className="px-7"><b>Students</b>  -  to assess their knowledge through developmental learning.</div>
                            <div className="px-7"><b>Quiz-lovers</b> - who enjoys learning through quizzes during their leisure time.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default About;