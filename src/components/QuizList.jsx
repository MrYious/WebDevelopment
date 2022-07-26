import { useContext, useEffect, useState } from "react";

import Axios from "../service/Axios"
import { PlusCircleIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { UserContext } from "../context/UserContext";
import nextId from "react-id-generator";
import { useOutletContext } from "react-router-dom";

const QuizList = () => {
    const contextData = useContext(UserContext);

    const [message, setMessage] = useOutletContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [choices, setChoices] = useState({
      A: "",
      B: "",
      C: "",
      D: "",
    })

    const [showNewQuizModal, setShowNewQuizModal] = useState(false);
    const [showQuizInfoModal, setShowQuizInfoModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [selectedQuestion, setSelectedQuestion] = useState({});


    const QUESTION_TYPES = [
      "True or False",
      "Multiple Choice - Single",
      "Multiple Choice - Multiple",
      "Identification",
      "Numerical"
    ]

    const TF = [
      "",
      "True",
      "False"
    ]

    const handleCreateNewQuiz = () => {
        Axios.post('http://localhost:5000/quiz/', {
          id: contextData.user._id,
          nickname: contextData.user.nickname,
          title,
          desc: description
        })
        .then(function (response) {
          // SUCCESS
          let data = response.data;
          setTitle("");
          setDescription("");
          showNewQuizModal(false);
          setMessage(data.msg);
          contextData.toggleCheckLogin();
        })
        .catch(function (error) {
          // FAIL
          console.log("Cant save data")
          setMessage(error.msg);
        });
    };

    const handleOpenQuiz = (e) => {
      console.log(e);
      const selected = contextData.listQuizzes.find(quiz => {
        return quiz._id === e;
      });
      setSelectedQuiz(selected);
      console.log(selectedQuiz);
      setShowQuizInfoModal(true);
    }

    const handleCreateNewQuestion = () => {
      setSelectedQuiz({...selectedQuiz, questions: [
        ...selectedQuiz.questions, {
          id: nextId(),
          type: "True or False",
          text: "",
          options: {
            A: "",
            B: "",
            C: "",
            D: "",
          },
          answer: [],
          points: 1,
          timeLimit: {
            enabled: true,
            duration: 60,
          }
        }
      ]});
    }

    const handleManageQuestion = (idx) => {
      console.log("Index", idx)
      const selected = selectedQuiz.questions.find((questions) => {
        return questions.id === idx;
      });
      console.log("Selected Question: ", selected)
      setSelectedQuestion(selected);
      setShowQuestionModal(true);
    }

    const handleShowOptions = () => {
      let component
      switch(selectedQuestion.type) {
        case "True or False":
          return <></>
        case "Multiple Choice - Single":
          component = <>
            <div className="flex flex-col gap-1">
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={choices.A} onChange={(e)=> {setChoices({...choices, A: e.target.value})}} type={"text"} autoComplete="option" placeholder="A"/>
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={choices.B} onChange={(e)=> {setChoices({...choices, B: e.target.value})}} type={"text"} autoComplete="option" placeholder="B"/>
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={choices.C} onChange={(e)=> {setChoices({...choices, C: e.target.value})}} type={"text"} autoComplete="option" placeholder="C"/>
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={choices.D} onChange={(e)=> {setChoices({...choices, D: e.target.value})}} type={"text"} autoComplete="option" placeholder="D"/>
            </div>
          </>
        break
        case "Identification":
          component = <>
            What will you write today?
          </>
        break
        case "Numerical":
          component = <>
            What will you write today?
          </>
        break
        default:
          component = <></>
      }
      let parent = <>
        <div className="flex items-start justify-center w-full gap-4">
          <b>Choices:</b>
          <div className="w-full">
            {component}
          </div>
        </div>
      </>
      return  parent
    }

    const handleShowAnswers = () => {
      let component
      switch(selectedQuestion.type) {
        case "True or False":
          component = <>
            <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" value={selectedQuestion.answer[0]} onChange={(e) => {setSelectedQuestion({...selectedQuestion, answer: [e.target.value]})}}>
              {TF.map((val, i) => {
                return <option key={i} value={val}>{val}</option>
              })}
            </select>
          </>
        break
        case "Multiple Choice - Single":
          component = <>
            <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" value={selectedQuestion.answer[0]} onChange={(e) => {setSelectedQuestion({...selectedQuestion, answer: [e.target.value]})}}>
              <option value={""}>{"Select One"}</option>
              <option value={choices.A}>{choices.A}</option>
              <option value={choices.B}>{choices.B}</option>
              <option value={choices.C}>{choices.C}</option>
              <option value={choices.D}>{choices.D}</option>
            </select>
          </>
        break
        case "Identification":
          component = <>
            What will you write today?
          </>
        break
        case "Numerical":
          component = <>
            What will you write today?
          </>
        break
        default:
          component = <></>
      }
      let parent = <>
        <div className="flex items-center justify-start w-full gap-5 ">
          <b>Answer:</b>
          <div className="flex w-full">
            {component}
          </div>
        </div>
      </>
      return  parent
      
    }

    const handleSaveQuestion = () => {
      console.log("Save Before Quiz: ", selectedQuiz);
      const options = {...choices};
      console.log(options , choices)
      if(selectedQuestion.type === "Multiple Choice - Single"){
        setSelectedQuestion({...selectedQuestion, options: {A: 'b', C: 'd'}});
        console.log(selectedQuestion)
      }
      console.log("Save Question: ", selectedQuestion);
      setSelectedQuiz({...selectedQuiz, questions:
        selectedQuiz.questions.map( (question) => {
          console.log(question)
          if( question.id === selectedQuestion.id ){
            return selectedQuestion
          }
          return question
        })
      });
      console.log("Save After Quiz: ", selectedQuiz);
      setChoices({A: "", B: "", C: "", D: ""});
      setShowQuestionModal(false);
    }

    return (<>
        <div className="flex flex-col items-center justify-start w-full h-full gap-2 py-4 overflow-y-auto">
            <div className="py-5 text-5xl font-bold">
                My Quizzes
            </div>
            <div className="flex justify-start gap-6 p-2 text-left bg-gray-200 rounded-full w-fit">
                <button onClick={() => setShowNewQuizModal(true)} className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-full w-fit hover:bg-gray-400">
                    <PlusCircleIcon className="w-8 rounded-full"/>
                    New Quiz
                </button>
                <div className="flex items-center justify-center gap-2 rounded-full w-fit">
                    <b className="text-lg ">Search: </b>
                    <input type={"text"} className="p-3 rounded-full" placeholder="Enter a keyword"/>
                </div>
            </div>
            <div className="flex flex-wrap justify-center w-4/5 gap-4 p-3 text-left bg-gray-300 rounded-2xl">
              { contextData.listQuizzes.length !== 0
                ? contextData.listQuizzes.map( (tile, i) => {
                    return <div key={i} onClick={() => {handleOpenQuiz(tile._id)}}  className="flex flex-col justify-center gap-4 p-4 border-2 rounded-md cursor-pointer w:80 md:w-72 lg:w-60 bg-slate-100 hover:border-orange-600">
                        <div className="py-1 text-xl font-bold text-orange-700">{tile.title}</div>
                        <div className="text-justify">{tile.desc}</div>
                        <div className="flex w-full gap-2">
                            <div className="px-2 border-2 border-black rounded-full w-fit"><b>{tile.noQuestions}</b> items</div>
                            <div className="px-2 border-2 border-black rounded-full w-fit"><b>{tile.datetime.cDate.slice(0, 10)}</b></div>
                        </div>
                    </div>
                })
                : <div className="text-xl ">Empty</div>
              }
            </div>
        </div>
        {showNewQuizModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-2 border-b border-solid rounded-t border-slate-200 ">
                  <h3 className="text-xl font-semibold ">
                    Create New Quiz
                  </h3>
                  <button
                    className="float-right p-1 text-3xl font-semibold leading-none border-0 outline-none "
                    onClick={() => setShowNewQuizModal(false)}
                  >
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex flex-col gap-3 p-6 ">
                    <input className="px-2 py-1 border-2 border-gray-400 border-solid rounded-sm w-80 bg-slate-100" maxLength="15" value={title} onChange={(e)=> {setTitle(e.target.value)}} type={"text"} placeholder="Title" autoComplete="title" required/>
                    <input className="px-2 py-1 border-2 border-gray-400 border-solid rounded-sm w-80 bg-slate-100" maxLength="50" value={description} onChange={(e)=> {setDescription(e.target.value)}} type={"text"} placeholder="Description" autoComplete="description" required/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={() => setShowNewQuizModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={handleCreateNewQuiz}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
        ) : null}
        {showQuizInfoModal && selectedQuiz ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center max-h-screen outline-none focus:outline-none">
            <div className="relative w-full h-full">
              {/*content*/}
              <div className="relative flex flex-col w-full h-full bg-gray-300 border-0 outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-center justify-between p-2 border-b border-solid rounded-t border-slate-200 ">
                  <h3 className="text-3xl font-semibold">
                    Manage Quiz
                  </h3>
                  <button
                    className="float-right p-1 text-3xl font-semibold leading-none border-0 outline-none "
                    onClick={() => setShowQuizInfoModal(false)}
                  >
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex flex-col items-start justify-start max-h-full overflow-y-auto">
                  <div className="flex justify-between w-full p-5 ">
                    <div className="flex gap-10 ">
                      <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-lg w-80 bg-slate-100" maxLength="15" value={selectedQuiz.title} onChange={(e)=> {setSelectedQuiz({...selectedQuiz, title: e.target.value})}} type={"text"} placeholder="Title" autoComplete="title" />
                      <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-lg w-80 bg-slate-100" maxLength="50" value={selectedQuiz.desc} onChange={(e)=> {setSelectedQuiz({...selectedQuiz, desc: e.target.value})}} type={"text"} placeholder="Description" autoComplete="description" />
                    </div>
                    <button onClick={()=>{}} className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-gray-700 rounded-full shadow-sm shadow-black w-fit">
                      Results
                    </button>
                  </div>
                  <div className="flex items-center justify-between w-full px-5 py-2 border-t-2 border-b-2 border-black border-solid">
                    <div className="text-3xl font-bold">Questions</div>
                    <div onClick={handleCreateNewQuestion} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-200 bg-gray-700 rounded-full shadow-sm cursor-pointer shadow-black w-fit">
                      <PlusIcon width={20}/> new
                    </div>
                  </div>
                  <div className="flex flex-wrap items-start justify-center w-full h-screen gap-2 p-4 rounded-xl">
                    {selectedQuiz.questions.length !== 0
                    ? selectedQuiz.questions.map( (question, i) =>
                      <div onClick={() => handleManageQuestion(question.id)}  key={i} className="flex flex-col items-start justify-start gap-2 p-4 bg-gray-400 border-2 cursor-pointer w-80 h-80 rounded-3xl hover:border-black " >
                        <div className="flex gap-2">
                          <b>Question: </b>
                          <div>{question.text}</div>
                        </div>
                        <div>
                          <b>Format: </b>
                          {question.type}
                        </div>
                        {question.type !== "True or False" &&
                          <div className="flex items-center justify-center gap-3">
                            <b>Options: </b>
                            <div className="flex flex-col">
                              <div>A: {question.options.A}</div>
                              <div>B: {question.options.B}</div>
                              <div>C: {question.options.C}</div>
                              <div>D: {question.options.D}</div>
                            </div>
                          </div>
                        }
                        <div>
                          <b>Answer: </b>
                          {question.answer.toString()}
                        </div>
                        <div><b>Points: </b>{question.points}</div>
                        {question.timeLimit.enabled &&
                          <div><b>Duration: </b>{question.timeLimit.duration} secs</div>
                        }
                      </div>
                    )
                    : <p className="text-xl font-bold">
                      Empty List
                    </p>}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-2 border-t border-solid rounded-b border-slate-200">
                  <div className="px-3 py-1 rounded-full">
                    {"Message"}
                  </div>
                  <div>
                    <button
                      className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                      type="button"
                      onClick={() => setShowQuizInfoModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={()=>{}}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
        ) : null}
        {showQuestionModal && selectedQuestion ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden outline-none focus:outline-none ">
            <div className="flex flex-col items-center justify-center w-2/6 h-5/6">
              {/*content*/}
              <div className="flex flex-col w-full max-h-full bg-white border-0 rounded-lg shadow-lg outline-none h-fit focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-2 border-b border-solid rounded-t border-slate-200 h-1/6">
                  <h3 className="text-xl font-semibold ">
                    Edit Question
                  </h3>
                  <button
                    className="float-right p-1 text-3xl font-semibold leading-none border-0 outline-none "
                    onClick={() => setShowQuestionModal(false)}
                  >
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex flex-col items-start justify-start w-full h-full gap-5 p-6 overflow-y-auto">
                  {/* QUESTION */}
                  <div className="flex items-center justify-start w-full gap-2">
                    <b>Question:</b>
                    <textarea name="question" value={selectedQuestion.text} onChange={(e) => { setSelectedQuestion({...selectedQuestion, text: e.target.value})}} rows="2" maxLength="150" className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg resize-none bg-slate-100"/>
                  </div>
                  {/* FORMAT */}
                  <div className="flex items-center justify-start gap-5">
                    <b>Format: </b>
                    <select className="px-2 py-1 border-2 border-gray-700 rounded-lg " value={selectedQuestion.type} onChange={(e) => setSelectedQuestion({...selectedQuestion, type: e.target.value})}>
                      {QUESTION_TYPES.map((option, i) => {
                        return <option key={i} value={option}>{option}</option>
                      })}
                    </select>
                  </div>
                  {/* FORMAT */}
                  {handleShowOptions()}
                  {handleShowAnswers()}
                  <div className="flex items-center justify-start w-full gap-5 ">
                    <div className="flex items-center justify-start w-2/5 gap-7 " >
                      <b>Points:</b>
                      <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="3" value={selectedQuestion.points} onChange={(e) => {setSelectedQuestion({...selectedQuestion, points: e.target.value})}} type={"number"} step="1" autoComplete="points" />
                    </div>
                    <div className="flex items-center justify-start w-3/5 gap-7 " >
                      <b>Duration(secs):</b>
                      <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="3" value={selectedQuestion.timeLimit.duration} onChange={(e) => {setSelectedQuestion({...selectedQuestion, timeLimit: {...selectedQuestion.timeLimit, duration: e.target.value}})}} type={"number"} step="1" autoComplete="duration" />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid rounded-b border-slate-200 h-1/6">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={() => setShowQuestionModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={handleSaveQuestion}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
        ) : null}
    </>);
}

export default QuizList;