import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";

import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import Axios from '../service/Axios';
import { UserContext } from "../context/UserContext";

//  TODO read users click on choices CHECK
//  next => check and show correct answer TODO => save data to userData
//  end => save to database quiz submissions

const TheRoom = () => {
    console.log("Render")

    let  {roomID, userID}  = useParams();
    const [quizData, setQuizData] = useOutletContext();
    const contextData = useContext(UserContext)

    const resetChoices = {
        option: {
            tf: '',
            A: false,
            B: false,
            C: false,
            D: false,
        },
        text: '',
        number: '',
    }

    const [currentNumber, setCurrentNumber] = useState(1)
    const [selectChoices, setSelectChoices] = useState(resetChoices)
    const [checkAnswer, setCheckAnswer] = useState(false)
    const [answerResult, setAnswerResult] = useState({
        tf: {
            answer: "",
            correctAnswer: ""
        }
    })
    const [userData, setUserData] = useState({
        nickname: "",
        userID: "",
        totalScore: 0,
        answers: [],
    })

    const data = {
        id: "",
        format: "",
        userAnswer: [],
        correctAnswer: [],
        evaluation: true,
        score: 0,
    }

    useEffect(() => {
        console.log("Room Effect", quizData)
    }, [])

    const handleCheckResults = (type, val) => {
        if(checkAnswer){
            switch(type){
                case "tf":
                    if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.tf){
                        // CORRECT ANSWER
                        if(val === selectChoices.option.tf){
                            return 'bg-green-800'
                        }else {
                            return 'bg-gray-800'
                        }
                    }else{
                        // INCORRECT ANSWER
                        if(val === quizData.questions[currentNumber-1].answer[0] ){
                            return 'bg-green-800'
                        }else {
                            return 'bg-red-800'
                        }
                    }
                case "single":
                    // val = separate inputs A-D
                    // selectChoices.option.A = selected answer
                    // quizData.questions[currentNumber-1].A = correct answer

                    // User selected A
                    if(selectChoices.option.A){
                        // Is A the correct answer?
                        if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.A){
                            // CORRECT ANSWER
                            return val === selectChoices.option.A
                                ? 'bg-green-800'
                                : 'bg-gray-800'
                        }else{
                            // INCORRECT ANSWER
                            return val === quizData.questions[currentNumber-1].answer[0]
                                ? 'bg-green-800'
                                : val === selectChoices.option.A
                                    ? 'bg-red-800'
                                    : 'bg-gray-800'
                        }
                    }else if(selectChoices.option.B){
                        // Is A the correct answer?
                        if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.B){
                            // CORRECT ANSWER
                            return val === selectChoices.option.B
                                ? 'bg-green-800'
                                : 'bg-gray-800'
                        }else{
                            // INCORRECT ANSWER
                            return val === quizData.questions[currentNumber-1].answer[0]
                                ? 'bg-green-800'
                                : val === selectChoices.option.B
                                    ? 'bg-red-800'
                                    : 'bg-gray-800'
                        }
                    }else if(selectChoices.option.C){
                        // Is A the correct answer?
                        if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.C){
                            // CORRECT ANSWER
                            return val === selectChoices.option.C
                                ? 'bg-green-800'
                                : 'bg-gray-800'
                        }else{
                            // INCORRECT ANSWER
                            return val === quizData.questions[currentNumber-1].answer[0]
                                ? 'bg-green-800'
                                : val === selectChoices.option.C
                                    ? 'bg-red-800'
                                    : 'bg-gray-800'
                        }
                    }else if(selectChoices.option.D){
                        // Is A the correct answer?
                        if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.D){
                            // CORRECT ANSWER
                            return val === selectChoices.option.D
                                ? 'bg-green-800'
                                : 'bg-gray-800'
                        }else{
                            // INCORRECT ANSWER
                            return val === quizData.questions[currentNumber-1].answer[0]
                                ? 'bg-green-800'
                                : val === selectChoices.option.D
                                    ? 'bg-red-800'
                                    : 'bg-gray-800'
                        }
                    }
                    break
                case "multiple":
                    if(quizData.questions[currentNumber-1].answer[0] === selectChoices.number){
                        // CORRECT ANSWER
                        return 'border-green-700 '
                    }else{
                        // INCORRECT ANSWER
                        return 'border-red-700 '
                    }
                case "text":
                    if(quizData.questions[currentNumber-1].answer[0].toLowerCase() === selectChoices.text.toLowerCase()){
                        // CORRECT ANSWER
                        return 'border-green-700 '
                    }else{
                        // INCORRECT ANSWER
                        return 'border-red-700 '
                    }
                case "number":
                    if(quizData.questions[currentNumber-1].answer[0] === selectChoices.number){
                        // CORRECT ANSWER
                        return 'border-green-700 '
                    }else{
                        // INCORRECT ANSWER
                        return 'border-red-700 '
                    }
                default:
                    return 
            }
        }else{
            switch(type){
                case "tf":
                    if(val === "True"){
                        return selectChoices.option.tf === 'True'
                            ? 'bg-gray-700 border-white'
                            : 'bg-blue-800'
                    }else if(val === "False"){
                        return selectChoices.option.tf === 'False'
                            ? 'bg-gray-700 border-white'
                            : 'bg-red-800'
                    }
                    break
                case "single":
                    if(val === quizData.questions[currentNumber-1].A){
                        return selectChoices.option.A
                            ? 'bg-gray-700 border-white'
                            : 'bg-blue-800'
                    }else if(val === quizData.questions[currentNumber-1].B){
                        return selectChoices.option.B
                            ? 'bg-gray-700 border-white'
                            : 'bg-red-800'
                    }else if(val === quizData.questions[currentNumber-1].C){
                        return selectChoices.option.C
                            ? 'bg-gray-700 border-white'
                            : 'bg-yellow-800'
                    }else if(val === quizData.questions[currentNumber-1].D){
                        return selectChoices.option.D
                            ? 'bg-gray-700 border-white'
                            : 'bg-green-800'
                    }
                    break
                case "multiple":
                    if(val === quizData.questions[currentNumber-1].A){
                        return selectChoices.option.A
                            ? 'bg-gray-700 border-white'
                            : 'bg-blue-800'
                    }else if(val === quizData.questions[currentNumber-1].B){
                        return selectChoices.option.B
                            ? 'bg-gray-700 border-white'
                            : 'bg-red-800'
                    }else if(val === quizData.questions[currentNumber-1].C){
                        return selectChoices.option.C
                            ? 'bg-gray-700 border-white'
                            : 'bg-yellow-800'
                    }else if(val === quizData.questions[currentNumber-1].D){
                        return selectChoices.option.D
                            ? 'bg-gray-700 border-white'
                            : 'bg-green-800'
                    }
                    break
                case "text":
                    return selectChoices.text
                        ? 'border-blue-700 '
                        : 'border-gray-700 '
                case "number":
                    return selectChoices.number
                        ? 'border-blue-700 '
                        : 'border-gray-700 '
                default:
                    return
            }
        }
    }

    const handleNext = () => {
        if(!checkAnswer){
            //CHECK ANSWER HERE
            alert('Check')
            setCheckAnswer(true);
            console.log("Answer", selectChoices)
            console.log("Correct Answer", quizData.questions[currentNumber - 1].answer[0])
        }else{
            //GO NEXT QUESTION AND RESET
            if(currentNumber + 1 <= quizData.questions.length){
                alert('Next Item')
                setSelectChoices(resetChoices)
                setCurrentNumber(currentNumber + 1);
                setCheckAnswer(false);
            }else{
                // END
                alert('END')
                console.log("END");
            }
        }
    }

    const handleSelectChoices = () => {
        console.log("CURRENT QUESTION", quizData.questions[currentNumber-1]);
        switch(quizData.questions[currentNumber-1].format) {
            case "True or False":
                return <>
                    <div className='flex flex-wrap items-center justify-center w-full gap-5 text-xl '>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('tf','True')}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {tf: 'True'}})}
                            }
                        }>
                            <div className={'flex items-center justify-center w-full text-center '}>TRUE</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('tf','False')}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {tf: 'False'}})}
                            }
                        }>
                            <div className='flex items-center justify-center w-full text-center'>FALSE</div>
                        </div>
                    </div>
                </>
            case "Multiple Choice - Single":
                return <>
                    <div className='flex flex-wrap items-center justify-center w-full gap-5 text-xl '>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('single', quizData.questions[currentNumber-1].A)}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {A: quizData.questions[currentNumber-1].A}})}
                            }
                        }>
                            <div className='font-bold'>A</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].A}</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('single',quizData.questions[currentNumber-1].B)}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {B: quizData.questions[currentNumber-1].B}})}
                            }
                        }>
                            <div className='font-bold'>B</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].B}</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('single', quizData.questions[currentNumber-1].C)}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {C: quizData.questions[currentNumber-1].C}})}
                            }
                        }>
                            <div className='font-bold'>C</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].C}</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('single', quizData.questions[currentNumber-1].D)}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {D: quizData.questions[currentNumber-1].D}})}
                            }
                        }>
                            <div className='font-bold'>D</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].D}</div>
                        </div>
                    </div>
                </>
            case "Multiple Choice - Multiple":
                return <>
                    <div className='flex flex-wrap items-center justify-center w-full gap-5 text-xl '>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('multiple', quizData.questions[currentNumber-1].A)}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {...selectChoices.option, A: !selectChoices.option.A}})}
                            }
                        }>
                            <div className='font-bold'>A</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].A}</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('multiple', quizData.questions[currentNumber-1].B)}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {...selectChoices.option, B: !selectChoices.option.B}})}
                            }
                        }>
                            <div className='font-bold'>B</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].B}</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('multiple', quizData.questions[currentNumber-1].C)}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {...selectChoices.option, C: !selectChoices.option.C}})}
                            }
                        }>
                            <div className='font-bold'>C</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].C}</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('multiple', quizData.questions[currentNumber-1].D)}`} onClick={() => {
                            if(!checkAnswer){
                                setSelectChoices({...selectChoices, option: {...selectChoices.option, D: !selectChoices.option.D}})}
                            }
                        }>
                            <div className='font-bold'>D</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].D}</div>
                        </div>
                    </div>
                </>
            case "Identification":
                return <>
                    <input className={`w-2/3 px-3 py-4 text-2xl text-center border-2 border-gray-700 border-solid rounded-lg bg-gray bg-slate-100 ${handleCheckResults('text')}`} maxLength="50" value={selectChoices.text} onChange={(e)=> {
                        if(!checkAnswer){
                            setSelectChoices({...selectChoices, text: e.target.value})
                        }
                    }} type={"text"} autoComplete="answer" placeholder="Enter answer" />
                </>
            case "Numerical":
                return <>
                    <input className={`w-2/3 px-3 py-4 text-2xl text-center border-2 border-solid rounded-lg bg-gray bg-slate-100 ${handleCheckResults('number')}`} maxLength="50" value={selectChoices.number} onChange={(e)=> {
                        if(!checkAnswer){
                            setSelectChoices({...selectChoices, number: e.target.value})
                        }
                    }} type={"number"} autoComplete="answer" placeholder="Enter answer" />
                </>
            default:
                return <></>
        }
    }

    return (<>
        <div className='flex flex-col items-center justify-center h-screen bg-gray-300'>
            {/* HEADER */}
            <div className="flex items-center justify-between w-full gap-1 px-3 py-3 text-white bg-gray-700 border-b-2 border-gray-500 text-back">
                <div className="text-3xl ">
                    SmartQ
                </div>
                <div className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-900 bg-gray-200 rounded-full w-fit">
                    { userID }
                </div>
            </div>
            <div className="flex items-center justify-between w-full h-full gap-10 p-5 text-center ">
                {/* LEFT */}
                <div className="flex justify-center w-1/6 font-bold ">
                    <div className='p-8 text-5xl text-gray-200 bg-green-700 rounded-full shadow-md w-fit shadow-green-800'>
                        {quizData.questions[currentNumber-1].timeLimit.duration}
                    </div>
                </div>
                {/* CONTENT */}
                <div className='flex flex-col items-center justify-start w-full h-full gap-12'>
                    <div className='flex items-center justify-center w-full py-5 text-3xl text-white bg-gray-700 rounded-full shadow-md px-7 h-2/5 shadow-black'>
                        {quizData.questions[currentNumber - 1].text}
                    </div>
                    {handleSelectChoices()}
                </div>
                {/* RIGHT */}
                <div className="flex flex-col items-center w-1/6 font-bold">
                    <div onClick={handleNext} className='flex flex-col items-center p-3 text-4xl text-gray-200 bg-green-700 border-2 border-transparent shadow-md cursor-pointer hover:border-white rounded-2xl w-fit shadow-green-800'>
                        <ArrowCircleRightIcon width={50}/>
                        { (checkAnswer && currentNumber === quizData.questions.length) && 'DONE'}
                        {/* { checkAnswer && currentNumber >= quizData.questions.length ? 'NEXT' :  currentNumber + 1 <= quizData.questions.length ? 'DONE' : 'CHECK' } */}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between w-full gap-2 px-3 py-2 bg-gray-700">
                <div className='w-2/6 px-4 py-1 font-medium text-gray-200 text-md'>
                    Points: <b className="text-emerald-400">{userData.totalScore}</b> / {quizData.totalPoints}
                </div>
                <div className='w-full px-4 py-1 font-medium text-center text-gray-200 text-md'>
                <b className="text-emerald-400">{currentNumber}</b> / {quizData.questions.length}
                </div>
                <div className="w-2/6 px-4 py-1 font-medium text-right text-gray-200 text-md">
                    Room Code: <b onClick={() => navigator.clipboard.writeText(roomID)} className="cursor-pointer text-emerald-300">{roomID}</b>
                </div>
            </div>
        </div>
    </>);
}

export default TheRoom;