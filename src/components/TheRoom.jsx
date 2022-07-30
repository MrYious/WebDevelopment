import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import Axios from '../service/Axios';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { UserContext } from "../context/UserContext";

const TheRoom = () => {

    let  {roomID, userID}  = useParams();
    const [quizData, setQuizData] = useOutletContext();
    const contextData = useContext(UserContext)
    console.log("Render", contextData)

    const resetChoices = {
        option: {
            tf: '',
            A: false,
            B: false,
            C: false,
            D: false,
            multi: ['', '', '', '']
        },
        text: '',
        number: '',
    }
    const resetUserData = {
        nickname: userID,
        userID: contextData.user._id ? contextData.user._id : '',
        totalScore: 0,
        answers: [],
    }
    const navigate = useNavigate();

    const [playTimer, setPlayTimer] = useState(true)

    const [showFinalResultModal, setShowFinalResultModal] = useState(false)
    const [currentNumber, setCurrentNumber] = useState(1)
    const [selectChoices, setSelectChoices] = useState(resetChoices)
    const [checkAnswer, setCheckAnswer] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const [userData, setUserData] = useState(resetUserData)

    useEffect(() => {
        console.log("Room Effect Quiz Data", quizData)
        console.log("Room Effect User Data", userData)
    }, [userData])

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
                    const answers = selectChoices.option.multi.filter((e) => {
                        return e
                    })
                    // Check if same length or not
                    if(quizData.questions[currentNumber-1].answer.length === answers.length){
                        // SAME LENGTH
                        // Check if all correctAnswers are the same as userAnswer
                        const result = quizData.questions[currentNumber-1].answer.filter((e) => {
                            return !answers.includes(e)
                        })
                        console.log('Result', result)
                        if(result.length === 0){
                            //CORRECT
                            // Check if option is included in the correct answers
                            return selectChoices.option.multi.includes(val)
                                ? 'bg-green-800'
                                : 'bg-gray-800'
                        }else{
                            //INCORRECT
                            // Check if option is included in correct answers
                            return quizData.questions[currentNumber-1].answer.includes(val)
                                ? answers.includes(val) //Included - Check if selected
                                    ? 'bg-green-800'       //Selected
                                    : 'bg-yellow-800'      //NotSelected
                                : answers.includes(val) //Not Included - Check if selected
                                    ? 'bg-red-800'         //Selected
                                    : 'bg-gray-800'
                        }
                    }else{
                        //INCORRECT LENGTH - INCORRECT
                        return quizData.questions[currentNumber-1].answer.includes(val)
                            ? answers.includes(val) //Included - Check if selected
                                ? 'bg-green-800'       //Selected
                                : 'bg-yellow-800'      //NotSelected
                            : answers.includes(val) //Not Included - Check if selected
                                ? 'bg-red-800'         //Selected
                                : 'bg-gray-800'
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

    const handleCheckAnswer = () => {
        switch(quizData.questions[currentNumber-1].format){
            case "True or False":
                if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.tf){
                    setMessage("Correct");
                    const answer = {
                        id: quizData.questions[currentNumber-1].id,
                        format: quizData.questions[currentNumber-1].format,
                        userAnswer: [selectChoices.option.tf],
                        correctAnswer: quizData.questions[currentNumber-1].answer,
                        evaluation: true,
                        score: quizData.questions[currentNumber-1].points,
                    }
                    setUserData({...userData, totalScore: userData.totalScore + quizData.questions[currentNumber-1].points, answers: [...userData.answers, answer]})
                }else{
                    setMessage("Incorrect");
                    setError(true);
                    const answer = {
                        id: quizData.questions[currentNumber-1].id,
                        format: quizData.questions[currentNumber-1].format,
                        userAnswer: [selectChoices.option.tf],
                        correctAnswer: quizData.questions[currentNumber-1].answer,
                        evaluation: false,
                        score: 0,
                    }
                    setUserData({...userData, answers: [...userData.answers, answer]})
                }
                setCheckAnswer(true);
                break
            case "Multiple Choice - Single":
                if(selectChoices.option.A){
                    // Is A the correct answer?
                    if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.A){
                        // CORRECT ANSWER
                        setMessage("Correct");
                        const answer = {
                            id: quizData.questions[currentNumber-1].id,
                            format: quizData.questions[currentNumber-1].format,
                            userAnswer: [selectChoices.option.A],
                            correctAnswer: quizData.questions[currentNumber-1].answer,
                            evaluation: true,
                            score: quizData.questions[currentNumber-1].points,
                        }
                        setUserData({...userData, totalScore: userData.totalScore + quizData.questions[currentNumber-1].points, answers: [...userData.answers, answer]})
                    }else{
                        // INCORRECT ANSWER
                        setMessage("The correct answer is: " + quizData.questions[currentNumber-1].answer[0]);
                        setError(true);
                        const answer = {
                            id: quizData.questions[currentNumber-1].id,
                            format: quizData.questions[currentNumber-1].format,
                            userAnswer: [selectChoices.option.A],
                            correctAnswer: quizData.questions[currentNumber-1].answer,
                            evaluation: false,
                            score: 0,
                        }
                        setUserData({...userData, answers: [...userData.answers, answer]})
                    }
                    setCheckAnswer(true);
                }else if(selectChoices.option.B){
                    // Is A the correct answer?
                    if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.B){
                        // CORRECT ANSWER
                        setMessage("Correct");
                        const answer = {
                            id: quizData.questions[currentNumber-1].id,
                            format: quizData.questions[currentNumber-1].format,
                            userAnswer: [selectChoices.option.B],
                            correctAnswer: quizData.questions[currentNumber-1].answer,
                            evaluation: true,
                            score: quizData.questions[currentNumber-1].points,
                        }
                        setUserData({...userData, totalScore: userData.totalScore + quizData.questions[currentNumber-1].points, answers: [...userData.answers, answer]})
                    }else{
                        // INCORRECT ANSWER
                        setMessage("The correct answer is: " + quizData.questions[currentNumber-1].answer[0]);
                        setError(true);
                        const answer = {
                            id: quizData.questions[currentNumber-1].id,
                            format: quizData.questions[currentNumber-1].format,
                            userAnswer: [selectChoices.option.B],
                            correctAnswer: quizData.questions[currentNumber-1].answer,
                            evaluation: false,
                            score: 0,
                        }
                        setUserData({...userData, answers: [...userData.answers, answer]})
                    }
                    setCheckAnswer(true);
                }else if(selectChoices.option.C){
                    // Is A the correct answer?
                    if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.C){
                        // CORRECT ANSWER
                        setMessage("Correct");
                        const answer = {
                            id: quizData.questions[currentNumber-1].id,
                            format: quizData.questions[currentNumber-1].format,
                            userAnswer: [selectChoices.option.C],
                            correctAnswer: quizData.questions[currentNumber-1].answer,
                            evaluation: true,
                            score: quizData.questions[currentNumber-1].points,
                        }
                        setUserData({...userData, totalScore: userData.totalScore + quizData.questions[currentNumber-1].points, answers: [...userData.answers, answer]})
                    }else{
                        // INCORRECT ANSWER
                        setMessage("The correct answer is: " + quizData.questions[currentNumber-1].answer[0]);
                        setError(true);
                        const answer = {
                            id: quizData.questions[currentNumber-1].id,
                            format: quizData.questions[currentNumber-1].format,
                            userAnswer: [selectChoices.option.C],
                            correctAnswer: quizData.questions[currentNumber-1].answer,
                            evaluation: false,
                            score: 0,
                        }
                        setUserData({...userData, answers: [...userData.answers, answer]})
                    }
                    setCheckAnswer(true);
                }else if(selectChoices.option.D){
                    // Is A the correct answer?
                    if(quizData.questions[currentNumber-1].answer[0] === selectChoices.option.D){
                        // CORRECT ANSWER
                        setMessage("Correct");
                        const answer = {
                            id: quizData.questions[currentNumber-1].id,
                            format: quizData.questions[currentNumber-1].format,
                            userAnswer: [selectChoices.option.D],
                            correctAnswer: quizData.questions[currentNumber-1].answer,
                            evaluation: true,
                            score: quizData.questions[currentNumber-1].points,
                        }
                        setUserData({...userData, totalScore: userData.totalScore + quizData.questions[currentNumber-1].points, answers: [...userData.answers, answer]})
                    }else{
                        // INCORRECT ANSWER
                        setMessage("The correct answer is: " + quizData.questions[currentNumber-1].answer[0]);
                        setError(true);
                        const answer = {
                            id: quizData.questions[currentNumber-1].id,
                            format: quizData.questions[currentNumber-1].format,
                            userAnswer: [selectChoices.option.D],
                            correctAnswer: quizData.questions[currentNumber-1].answer,
                            evaluation: false,
                            score: 0,
                        }
                        setUserData({...userData, answers: [...userData.answers, answer]})
                    }
                    setCheckAnswer(true);
                }else{
                    setMessage("Select an answer");
                    setError(true);
                }
                break
            case "Multiple Choice - Multiple":
                const answers = selectChoices.option.multi.filter((e) => {
                    return e
                })
                const result = quizData.questions[currentNumber-1].answer.filter((e) => {
                    return !answers.includes(e)
                })
                console.log("RESULT 123", result)
                if(result.length === 0 && quizData.questions[currentNumber-1].answer.length === answers.length){
                    //CORRECT
                    //Check if option is included in the correct answers
                    setMessage("Correct");
                    const answer = {
                        id: quizData.questions[currentNumber-1].id,
                        format: quizData.questions[currentNumber-1].format,
                        userAnswer: answers,
                        correctAnswer: quizData.questions[currentNumber-1].answer,
                        evaluation: true,
                        score: quizData.questions[currentNumber-1].points,
                    }
                    setUserData({...userData, totalScore: userData.totalScore + quizData.questions[currentNumber-1].points, answers: [...userData.answers, answer]})
                }else{
                    //INCORRECT
                    //Check if option is included in correct answers
                    setMessage("The correct answers are: " + quizData.questions[currentNumber-1].answer.toString());
                    setError(true);
                    const answer = {
                        id: quizData.questions[currentNumber-1].id,
                        format: quizData.questions[currentNumber-1].format,
                        userAnswer: answers,
                        correctAnswer: quizData.questions[currentNumber-1].answer,
                        evaluation: false,
                        score: 0,
                    }
                    setUserData({...userData, answers: [...userData.answers, answer]})
                }
                setCheckAnswer(true);
                break
            case "Identification":
                if(quizData.questions[currentNumber-1].answer[0].toLowerCase() === selectChoices.text.toLowerCase()) {
                    setMessage("Correct");
                    const answer = {
                        id: quizData.questions[currentNumber-1].id,
                        format: quizData.questions[currentNumber-1].format,
                        userAnswer: [selectChoices.text],
                        correctAnswer: quizData.questions[currentNumber-1].answer,
                        evaluation: true,
                        score: quizData.questions[currentNumber-1].points,
                    }
                    setUserData({...userData, totalScore: userData.totalScore + quizData.questions[currentNumber-1].points, answers: [...userData.answers, answer]})
                }else{
                    setMessage("The correct answer is: " + quizData.questions[currentNumber-1].answer[0]);
                    setError(true);
                    const answer = {
                        id: quizData.questions[currentNumber-1].id,
                        format: quizData.questions[currentNumber-1].format,
                        userAnswer: [selectChoices.text],
                        correctAnswer: quizData.questions[currentNumber-1].answer,
                        evaluation: false,
                        score: 0,
                    }
                    setUserData({...userData, answers: [...userData.answers, answer]})
                }
                setCheckAnswer(true);
                break
            case "Numerical":
                if(quizData.questions[currentNumber-1].answer[0] === selectChoices.number){
                    setMessage("Correct");const answer = {
                        id: quizData.questions[currentNumber-1].id,
                        format: quizData.questions[currentNumber-1].format,
                        userAnswer: [selectChoices.number],
                        correctAnswer: quizData.questions[currentNumber-1].answer,
                        evaluation: true,
                        score: quizData.questions[currentNumber-1].points,
                    }
                    setUserData({...userData, totalScore: userData.totalScore + quizData.questions[currentNumber-1].points, answers: [...userData.answers, answer]})
                }else{
                    setMessage("The correct answer is: " + quizData.questions[currentNumber-1].answer[0]);
                    setError(true);
                    const answer = {
                        id: quizData.questions[currentNumber-1].id,
                        format: quizData.questions[currentNumber-1].format,
                        userAnswer: [selectChoices.number],
                        correctAnswer: quizData.questions[currentNumber-1].answer,
                        evaluation: false,
                        score: 0,
                    }
                    setUserData({...userData, answers: [...userData.answers, answer]})
                }
                setCheckAnswer(true);
                break
            default:
                break
        }
    }

    const handleNext = () => {
        if(!checkAnswer){
            //CHECK ANSWER HERE
            setPlayTimer(false)
            handleCheckAnswer()
            console.log("Answer", selectChoices)
            console.log("Correct Answer", quizData.questions[currentNumber - 1].answer[0])
        }else{
            //GO NEXT QUESTION AND RESET
            if(currentNumber + 1 <= quizData.questions.length){
                setSelectChoices(resetChoices)
                setCurrentNumber(currentNumber + 1)
                setCheckAnswer(false)
                setError(false);
                setMessage("");
                setPlayTimer(true)
            }else{
                // END
                console.log("END");
                handleShowResults()
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
                                const ans = selectChoices.option.multi.map((e, i) => {
                                    if(i === 0){
                                        return e ? '' : quizData.questions[currentNumber-1].A
                                    }
                                    return e
                                })
                                setSelectChoices({...selectChoices, option: {...selectChoices.option, A: !selectChoices.option.A, multi: [...ans]}})}
                            }
                        }>
                            <div className='font-bold'>A</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].A}</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('multiple', quizData.questions[currentNumber-1].B)}`} onClick={() => {
                            if(!checkAnswer){
                                const ans = selectChoices.option.multi.map((e, i) => {
                                    if(i === 1){
                                        return e ? '' : quizData.questions[currentNumber-1].B
                                    }
                                    return e
                                })
                                setSelectChoices({...selectChoices, option: {...selectChoices.option, B: !selectChoices.option.B, multi: [...ans]}})}
                            }
                        }>
                            <div className='font-bold'>B</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].B}</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('multiple', quizData.questions[currentNumber-1].C)}`} onClick={() => {
                            if(!checkAnswer){
                                const ans = selectChoices.option.multi.map((e, i) => {
                                    if(i === 2){
                                        return e ? '' : quizData.questions[currentNumber-1].C
                                    }
                                    return e
                                })
                                setSelectChoices({...selectChoices, option: {...selectChoices.option, C: !selectChoices.option.C, multi: [...ans]}})}
                            }
                        }>
                            <div className='font-bold'>C</div>
                            <div className='flex items-center justify-center w-full text-center'>{quizData.questions[currentNumber-1].C}</div>
                        </div>
                        <div className={`flex w-2/5 p-5 text-white border-2 border-transparent rounded-full shadow-md cursor-pointer shadow-black hover:border-white ${handleCheckResults('multiple', quizData.questions[currentNumber-1].D)}`} onClick={() => {
                            if(!checkAnswer){
                                const ans = selectChoices.option.multi.map((e, i) => {
                                    if(i === 3){
                                        return e ? '' : quizData.questions[currentNumber-1].D
                                    }
                                    return e
                                })
                                setSelectChoices({...selectChoices, option: {...selectChoices.option, D: !selectChoices.option.D, multi: [...ans]}})}
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

    const handleSubmit = () => {
        Axios.put('http://localhost:5000/quiz/user', {
          id: quizData._id,
          userData: userData
        })
        .then(function (response) {
            // SUCCESS
            setShowFinalResultModal(false)
            setUserData(resetUserData)
            navigate('/');
        })
        .catch(function (error) {
            // FAIL
            console.log("Cant save data", error)
        });
    }

    const handleShowResults = () => {
        setShowFinalResultModal(true)
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
                <div className="flex justify-center w-1/6 text-5xl font-bold">
                        {/* {quizData.questions[currentNumber-1].timeLimit.duration} */}
                        {
                            playTimer && <>
                                <CountdownCircleTimer
                                    isPlaying={playTimer}
                                    duration={quizData.questions[currentNumber-1].timeLimit.duration}
                                    colors={['#166534', '#F7B801','#991B1B', '#991B1B']}
                                    trailColor='#D1D5DB'
                                    strokeWidth={16}
                                    updateInterval={1}
                                    colorsTime={[quizData.questions[currentNumber-1].timeLimit.duration, quizData.questions[currentNumber-1].timeLimit.duration / 2, 0]}
                                    size={130}
                                    onComplete={() => {
                                        // do your stuff here
                                        setPlayTimer(false)
                                        handleNext()
                                        return { shouldRepeat: true}
                                    }}
                                >
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer>
                            </>
                        }
                        
                </div>
                {/* CONTENT */}
                <div className='flex flex-col items-center justify-start w-full h-full gap-10'>
                    <div className='flex items-center justify-center w-full py-5 text-3xl text-white bg-gray-700 rounded-full shadow-md px-7 h-2/5 shadow-black'>
                        {quizData.questions[currentNumber - 1].text}
                    </div>
                    {handleSelectChoices()}
                    {message &&
                        <div className={`flex py-3 px-3 gap-2 text-lg rounded-full shadow-sm shadow-black ${error ? "bg-red-500 text-white" : "bg-green-500"}`}>
                            {error ? <ExclamationCircleIcon width={25}/> : <CheckCircleIcon width={25}/>}
                            {message}
                        </div>
                    }
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
        { showFinalResultModal && <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-1/4 max-w-3xl mx-auto my-6">
                {/*content*/}
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-center justify-between p-2 border-b border-solid rounded-t border-slate-200 ">
                    <h3 className="text-xl font-semibold ">
                        Congratulations
                    </h3>
                    <button
                        className="float-right p-1 text-3xl font-semibold leading-none border-0 outline-none "
                        onClick={() => setShowFinalResultModal(false)}
                    >
                        <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative flex flex-col gap-5 p-6 ">
                        <div>
                            <div>
                                Thank you for answering the quiz!
                            </div>
                            <div>
                                You have achieved <b>{userData.totalScore}</b> out of <b>{quizData.totalPoints} points</b>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between'>
                                <b>Summary: </b>
                                <b>{userData.answers.filter(e => {return e.evaluation}).length} / {quizData.questions.length} questions</b>
                            </div>
                            <div className='flex flex-wrap items-start justify-start gap-4'>
                                {
                                    userData.answers.map((answer, i) => {
                                        if(answer.evaluation){
                                            return <div key={i} className="flex items-center gap-1">{i+1}: <CheckCircleIcon width={25} color={'green'}/> </div>
                                        }
                                        return <div key={i} className="flex">{i+1}: <XCircleIcon width={25} color={'red'}/></div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-2 border-t border-solid rounded-b border-slate-200">
                    <button
                        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>

        </>}
    </>);
}

export default TheRoom;