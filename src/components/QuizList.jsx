import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CheckCircleIcon, PlusCircleIcon, RefreshIcon, XCircleIcon } from "@heroicons/react/outline";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { useContext, useEffect, useState } from "react";

import Axios from "../service/Axios"
import { UserContext } from "../context/UserContext";
import { customAlphabet } from 'nanoid'
import nextId from "react-id-generator";

// TODO IMPLEMENT QUESTION TIMER PER QUESTION AND TRIGGER NEXT AUTOMATICALLY


const QuizList = () => {
    const contextData = useContext(UserContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [filter, setFilter] = useState('');
    const [filterResults, setFilterResults] = useState('');
    const [analytics, setAnalytics] = useState({});

    const [showNewQuizModal, setShowNewQuizModal] = useState(false);
    const [showQuizInfoModal, setShowQuizInfoModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [showAnalyticModal, setShowAnalyticModal] = useState(false);

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [selectedQuestion, setSelectedQuestion] = useState({});

    console.log("render", selectedQuiz);

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
          setShowNewQuizModal(false);
          setTitle("");
          setDescription("");
          contextData.toggleCheckLogin();
        })
        .catch(function (error) {
          // FAIL
          console.log("Cant save data", error)
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

    const handleStartQuiz = () => {
      const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 7)
      const genCode = nanoid()
      Axios.put('http://localhost:5000/quiz/', {
        selectedQuiz: {...selectedQuiz, state: "Running", code: genCode},
      })
      .then(function (response) {
        // SUCCESS
        console.log(response.data.msg);
        setSelectedQuiz({...selectedQuiz, state: "Running", code: genCode})
        contextData.toggleCheckLogin();
      })
      .catch(function (error) {
        // FAIL
        console.log(error.response.data.msg);
      });
    }

    const handleStopQuiz = () => {
      Axios.put('http://localhost:5000/quiz/', {
        selectedQuiz: {...selectedQuiz, state: "Completed"},
      })
      .then(function (response) {
        // SUCCESS
        console.log(response.data.msg);
        setSelectedQuiz({...selectedQuiz, state: "Completed"})
        contextData.toggleCheckLogin();
      })
      .catch(function (error) {
        // FAIL
        console.log(error.response.data.msg);
      });
    }

    const handleDeleteQuiz = () =>{
      console.log(selectedQuiz._id)
      Axios.post('http://localhost:5000/quiz/delete', {
        id: selectedQuiz._id
      })
      .then(function (response) {
        // SUCCESS
        console.log(response.data.msg);
        contextData.toggleCheckLogin();
        setShowQuizInfoModal(false);
      })
      .catch(function (error) {
        // FAIL
        console.log(error.response.data.msg);
      });
    }

    const handleShowQuizInfoControls = () => {
      switch (selectedQuiz.state) {
        case "Empty":
          return <>
            <button onClick={()=>{}} className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-gray-500 rounded-full shadow-md shadow-black w-fit">
              Start
            </button>
          </>
        case "Ready":
          return <>
            <button onClick={handleStartQuiz} className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-blue-900 rounded-full shadow-md shadow-black w-fit">
              Start
            </button>
          </>
        case "Running":
          return <>
            <button onClick={handleStopQuiz} className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-red-500 rounded-full shadow-md shadow-black w-fit">
              Stop
            </button>
          </>
        case "Completed":
          return <>
            <button onClick={handleStartQuiz} className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-blue-900 rounded-full shadow-md shadow-black w-fit">
              Start
            </button>
            <button onClick={()=>{setShowResultsModal(true)}} className="flex items-center px-4 py-2 text-lg font-medium text-gray-200 bg-blue-900 rounded-full shadow-md shadow-black w-fit">
              Results
            </button>
          </>
        default:
          break;
      }
    }

    const handleCreateNewQuestion = () => {
      setSelectedQuiz((prev) => {return{...prev, totalPoints: prev.totalPoints + 1, questions: [
        ...selectedQuiz.questions, {
          id: nextId(),
          format: "True or False",
          text: "",
          A: "",
          B: "",
          C: "",
          D: "",
          answer: [],
          points: 1,
          timeLimit: {
            enabled: true,
            duration: 60,
          }
        }
      ]}});
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

    const handleDeleteQuestion = () => {
      const newQuestions  = selectedQuiz.questions.filter(e => {
        return selectedQuestion.id !== e.id
      })
      setSelectedQuiz({ ...selectedQuiz, questions: [...newQuestions]})
      setShowQuestionModal(false);
      setSelectedQuestion({})
    }

    const handleShowOptions = () => {
      let component
      switch(selectedQuestion.format) {
        case "True or False":
          return <></>
        case "Multiple Choice - Single":
          component = <>
            <div className="flex flex-col gap-1">
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={selectedQuestion.A} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, A: e.target.value})}} type={"text"} autoComplete="option" placeholder="A"/>
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={selectedQuestion.B} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, B: e.target.value})}} type={"text"} autoComplete="option" placeholder="B"/>
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={selectedQuestion.C} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, C: e.target.value})}} type={"text"} autoComplete="option" placeholder="C"/>
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={selectedQuestion.D} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, D: e.target.value})}} type={"text"} autoComplete="option" placeholder="D"/>
            </div>
          </>
        break
        case "Multiple Choice - Multiple":
          component = <>
            <div className="flex flex-col gap-1">
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={selectedQuestion.A} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, A: e.target.value})}} type={"text"} autoComplete="option" placeholder="A"/>
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={selectedQuestion.B} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, B: e.target.value})}} type={"text"} autoComplete="option" placeholder="B"/>
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={selectedQuestion.C} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, C: e.target.value})}} type={"text"} autoComplete="option" placeholder="C"/>
              <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" maxLength="15" value={selectedQuestion.D} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, D: e.target.value})}} type={"text"} autoComplete="option" placeholder="D"/>
            </div>
          </>
        break
        case "Identification":
          return <></>
        case "Numerical":
          return <></>
        default:
          component = <></>
      }
      let parent = <>
        <div className="flex items-start justify-center w-full gap-4">
          <b>Options:</b>
          <div className="w-full">
            {component}
          </div>
        </div>
      </>
      return  parent
    }

    const handleShowAnswers = () => {
      let component
      switch(selectedQuestion.format) {
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
              <option value={selectedQuestion.A}>{selectedQuestion.A}</option>
              <option value={selectedQuestion.B}>{selectedQuestion.B}</option>
              <option value={selectedQuestion.C}>{selectedQuestion.C}</option>
              <option value={selectedQuestion.D}>{selectedQuestion.D}</option>
            </select>
          </>
        break
        case "Multiple Choice - Multiple":
          component = <>
            <select className="px-2 py-1 border-2 border-gray-700 rounded-lg w-fit" multiple value={selectedQuestion.answer} onChange={(e) => {handleSelectMultiple(e)}}>
              <option value={selectedQuestion.A}>{selectedQuestion.A}</option>
              <option value={selectedQuestion.B}>{selectedQuestion.B}</option>
              <option value={selectedQuestion.C}>{selectedQuestion.C}</option>
              <option value={selectedQuestion.D}>{selectedQuestion.D}</option>
            </select>
          </>
        break
        case "Identification":
          component = <>
            <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-lg w-80 bg-slate-100" maxLength="50" value={selectedQuestion.answer[0]} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, answer: [e.target.value]})}} type={"text"} autoComplete="answer" />
          </>
        break
        case "Numerical":
          component = <>
            <input className="px-2 py-1 border-2 border-gray-700 border-solid rounded-lg w-80 bg-slate-100" maxLength="50" value={parseInt(selectedQuestion.answer[0])} onChange={(e)=> {setSelectedQuestion({...selectedQuestion, answer: [e.target.value]})}} type={"number"} autoComplete="answer" />
          </>
        break
        default:
          component = <></>
      }
      let parent = <>
        <div className="flex items-start justify-start w-full gap-5 ">
          <b>Answer:</b>
          <div className="flex w-full">
            {component}
          </div>
        </div>
      </>
      return  parent
    }

    const handleSaveQuestion = () => {
      setSelectedQuiz({...selectedQuiz, questions:
        selectedQuiz.questions.map( (question) => {
          if( question.id === selectedQuestion.id ){
            return selectedQuestion
          }
          return question
        })
      });
      console.log("Save Question: ", selectedQuestion);
      let sum = selectedQuiz.questions.reduce(function(prev, current) {
        if(current.id === selectedQuestion.id){
          return prev + selectedQuestion.points
        }
        return prev + current.points
      }, 0);
      console.log(sum)
      setSelectedQuiz(prev => {return {...prev, totalPoints: sum}})
      setShowQuestionModal(false);
      setSelectedQuestion({})
    }

    const handleSaveQuiz = () => {
      console.log("Save Quiz: ", selectedQuiz);

      if(selectedQuiz.state === "Empty"){
        Axios.put('http://localhost:5000/quiz/', {
          selectedQuiz: {...selectedQuiz, state: "Ready"},
        })
        .then(function (response) {
          // SUCCESS
          console.log(response.data.msg);
          setShowQuizInfoModal(false);
          contextData.toggleCheckLogin();
        })
        .catch(function (error) {
          // FAIL
          console.log(error.response.data.msg);
        });
      } else {
        Axios.put('http://localhost:5000/quiz/', {
          selectedQuiz: selectedQuiz,
        })
        .then(function (response) {
          // SUCCESS
          console.log(response.data.msg);
          setShowQuizInfoModal(false);
          contextData.toggleCheckLogin();
        })
        .catch(function (error) {
          // FAIL
          console.log(error.response.data.msg);
        });
      }
    }

    const handleSelectMultiple = (e) => {
      let value = Array.from(e.target.selectedOptions, option => option.value);
      setSelectedQuestion({...selectedQuestion, answer: [...value]})
    }

    const handleChangeQuestionFormat = (e) => {
      setSelectedQuestion({
        ...selectedQuestion,
        format: e.target.value,
        A: "",
        B: "",
        C: "",
        D: "",
        answer: [],
      })
    }

    const handleGenerateAnalytics = () => {
      const bar = selectedQuiz.questions.map((question, i) => {
        //filter submissions where users are correct for this question
        let correct = selectedQuiz.submission.filter((e) => {
          return question.id === e.answers[i].id && e.answers[i].evaluation
        }).length
        let incorrect = selectedQuiz.submission.filter((e, idx) => {
          return question.id === e.answers[i].id && !e.answers[i].evaluation
        }).length

        return {
          Name: 'Q' + (i+1),
          Correct: correct,
          Incorrect: incorrect,
        }
      })
      console.log(bar)
      const ranking = selectedQuiz.submission.map((user) => {
        return {
          name: user.nickname,
          score: user.totalScore,
          correctAnswer: user.answers.filter((answer, i) => {return answer.evaluation}).length
        }
      })
      console.log(ranking)
      setAnalytics({...analytics, bar, ranking })
    }

    return (<>
        <div className="flex flex-col items-center justify-start w-full h-full gap-2 py-4 overflow-y-auto">
            <div className="flex items-center justify-between w-4/5 gap-5">
              <div className="py-5 text-5xl font-bold text-white ">
                My Quizzes
              </div>
              <div className="flex justify-start gap-6 p-2 text-left bg-green-900 rounded-full w-fit">
                  <button onClick={() => setShowNewQuizModal(true)} className="flex items-center justify-center gap-1 p-2 font-bold bg-gray-100 rounded-full shadow-md shadow-black w-fit">
                      <PlusCircleIcon className="w-8 rounded-full"/>
                      New Quiz
                  </button>
                  <div className="flex items-center justify-center gap-2 rounded-full w-fit">
                      <b className="text-lg text-white">Search: </b>
                      <input type={"text"} value={filter} onChange={(e)=>{setFilter(e.target.value)}} className="p-3 rounded-full shadow-md shadow-black" placeholder="Enter a keyword"/>
                  </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center w-4/5 gap-4 p-3 text-left rounded-2xl">
              {
                contextData.listQuizzes.filter((quiz) => {
                  return quiz.title.toLowerCase().includes(filter.toLowerCase()) || quiz.desc.toLowerCase().includes(filter.toLowerCase())
                }).length !== 0
                  ? contextData.listQuizzes.filter((quiz) => {return quiz.title.toLowerCase().includes(filter.toLowerCase()) || quiz.desc.toLowerCase().includes(filter.toLowerCase())}).map( (tile, i) => {
                    return <div key={i} onClick={() => {handleOpenQuiz(tile._id)}}  className={"flex flex-col justify-center gap-4 p-4 border-[3px] rounded-md cursor-pointer w:80 md:w-72 lg:w-60 bg-green-100 hover:border-black shadow-md shadow-black"}>
                        <div className="py-1 text-xl font-bold text-orange-700">{tile.title}</div>
                        <div className="text-left">{tile.desc}</div>
                        <div className="flex w-full gap-2">
                            <div className="px-2 border-2 border-black rounded-full w-fit"><b>{tile.questions.length}</b> items</div>
                            <div className="px-2 border-2 border-black rounded-full w-fit"><b>{tile.datetime.cDate.slice(0, 10)}</b></div>
                        </div>
                    </div>
                    })
                  : <div className="text-xl text-white ">Empty list</div>
              }
            </div>
        </div>
        {showNewQuizModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full border-0 rounded-lg shadow-lg outline-none bg-green-50 focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-2 border-b border-solid rounded-t border-slate-200 ">
                  <h3 className="text-xl font-semibold ">
                    Create New Quiz
                  </h3>
                  <button
                    className="float-right p-1 text-3xl font-semibold leading-none border-0 outline-none "
                    onClick={() => setShowNewQuizModal(false)}
                  >
                    <XIcon width={25} />
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
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-green-800 rounded shadow-md outline-none shadow-black active:bg-emerald-600 focus:outline-none"
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
              <div className="relative flex flex-col w-full h-full bg-green-200 border-0 outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-center justify-between p-2">
                  <h3 className="px-4 text-3xl font-semibold">
                    Manage Quiz
                  </h3>
                  <button
                    className="float-right p-1 text-3xl font-semibold leading-none border-0 outline-none "
                    onClick={() => setShowQuizInfoModal(false)}
                  >
                    <XIcon width={25} />
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex flex-col items-start justify-start h-full max-h-full overflow-y-auto bg-gradient-to-r from-emerald-700 to-green-700">
                  {/* head */}
                  <div className="flex justify-between w-full px-5 py-3 text-gray-50">
                    <div className="flex items-center justify-start gap-5 ">
                      <b className="text-xl">Title:</b><input className="px-2 py-1 text-black border-2 border-gray-700 border-solid rounded-lg w-80 bg-slate-100" maxLength="15" value={selectedQuiz.title} onChange={(e)=> {setSelectedQuiz({...selectedQuiz, title: e.target.value})}} type={"text"} placeholder="Title" autoComplete="title" />
                      <b className="text-xl ">Description:</b><input className="px-2 py-1 text-black border-2 border-gray-700 border-solid rounded-lg w-80 bg-slate-100" maxLength="50" value={selectedQuiz.desc} onChange={(e)=> {setSelectedQuiz({...selectedQuiz, desc: e.target.value})}} type={"text"} placeholder="Description" autoComplete="description" />
                      <b className="text-xl ">Points:</b><div className="text-xl ">{selectedQuiz.totalPoints}</div>
                    </div>
                    <div className="flex gap-3">
                      {handleShowQuizInfoControls()}
                      { (selectedQuiz.state === "Empty" || selectedQuiz.state === "Ready" || selectedQuiz.state === "Completed" )
                        &&
                        <button onClick={handleDeleteQuiz} className="flex items-center px-5 py-2 text-lg font-medium text-gray-200 bg-red-700 rounded-full shadow-md shadow-black w-fit">
                          Delete
                        </button>
                      }
                    </div>
                  </div>
                  {/* body */}
                  <div className="flex flex-col items-center justify-start w-full gap-6 px-2 py-5">
                    <div className="flex items-center justify-between w-full px-2 py-2 bg-green-900 rounded-full">
                      <div className="px-6 text-3xl font-bold text-gray-100">Questions</div>
                      { (selectedQuiz.state === "Empty" || selectedQuiz.state === "Ready" || selectedQuiz.state === "Completed")
                        &&
                        <div onClick={handleCreateNewQuestion} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-900 bg-green-100 rounded-full shadow-md cursor-pointer shadow-black w-fit">
                          <PlusIcon width={20}/> new
                        </div>
                      }
                    </div>
                    <div className="flex flex-wrap items-start justify-center gap-3 ">
                      {selectedQuiz.questions.length !== 0
                      ? selectedQuiz.questions.map( (question, i) =>
                        <div onClick={() => handleManageQuestion(question.id)} key={i} className="flex flex-col items-start justify-start gap-2 p-4 bg-green-200 border-[3px] border-green-200 shadow-md cursor-pointer shadow-black w-80 h-fit rounded-3xl hover:border-gray-900 " >
                          <div className="flex gap-2 text-left">
                            <b>Question: </b>
                            <div>{question.text}</div>
                          </div>
                          <div>
                            <b>Format: </b>
                            {question.format}
                          </div>
                          {question.format !== QUESTION_TYPES[0] && question.format !== QUESTION_TYPES[3] && question.format !== QUESTION_TYPES[4]
                          &&
                            <div className="flex items-start justify-start w-full gap-3">
                              <b>Options: </b>
                              <div className="flex flex-col w-full text-left">
                                <div className="w-full">A: {question.A}</div>
                                <div className="w-full">B: {question.B}</div>
                                <div className="w-full">C: {question.C}</div>
                                <div className="w-full">D: {question.D}</div>
                              </div>
                            </div>
                          }
                          <div className="flex flex-wrap justify-start w-full gap-2">
                            <b>Answer: </b>
                            <div>{question.answer.toString()}</div>
                          </div>
                          <div><b>Points: </b>{question.points}</div>
                          {question.timeLimit.enabled &&
                            <div><b>Duration: </b>{question.timeLimit.duration} secs</div>
                          }
                        </div>
                      )
                      : <p className="text-2xl font-bold text-gray-200">
                        Empty List
                      </p>}
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-2 bg-green-200">
                  <div className="flex items-center gap-5">
                    <div>Status: <b>{selectedQuiz.state}</b></div>
                    {selectedQuiz.state === "Running" && <div>Room Code: <b className="cursor-pointer " onClick={() => navigator.clipboard.writeText(selectedQuiz.code)}>{selectedQuiz.code}</b></div>}
                    {selectedQuiz.state === "Running" && <div># Completed: <b>{selectedQuiz.results.noOfCompletion}</b></div>}
                    {selectedQuiz.state === "Running" && <div><button onClick={()=>{
                        contextData.toggleCheckLogin()
                        const selected = contextData.listQuizzes.find(quiz => {
                          return quiz._id === selectedQuiz._id;
                        });
                        setSelectedQuiz(selected);
                      }} className="flex items-center p-2 text-lg font-medium text-gray-200 bg-green-900 rounded-full shadow-sm shadow-black w-fit">
                        <RefreshIcon width={15}/>
                      </button>
                    </div>}
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
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-green-800 rounded shadow-md outline-none shadow-black active:bg-emerald-600 focus:outline-none"
                      type="button"
                      onClick={handleSaveQuiz}
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
            <div className="flex flex-col items-center justify-center w-2/6 h-5/6 ">
              {/*content*/}
              <div className="flex flex-col w-full max-h-full border-0 rounded-lg shadow-lg outline-none bg-green-50 h-fit focus:outline-none ">
                {/*header*/}
                <div className="flex items-center justify-between p-2 border-b border-solid rounded-t border-slate-200 h-1/6">
                  <h3 className="text-xl font-semibold ">
                    Edit Question
                  </h3>
                  <button
                    className="float-right p-1 text-3xl font-semibold leading-none border-0 outline-none "
                    onClick={() => setShowQuestionModal(false)}
                  >
                    <XIcon width={25} />
                  </button>
                </div>
                {/*body*/}
                <div className="flex flex-col items-start justify-start w-full h-full gap-5 p-6 overflow-y-auto">
                  {/* QUESTION */}
                  <div className="flex items-center justify-start w-full gap-2">
                    <b>Question:</b>
                    <textarea name="question" placeholder="Enter a question" value={selectedQuestion.text} onChange={(e) => { setSelectedQuestion({...selectedQuestion, text: e.target.value})}} rows="2" maxLength="150" className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg resize-none bg-slate-100"/>
                  </div>
                  {/* FORMAT */}
                  <div className="flex items-center justify-start gap-5">
                    <b>Format: </b>
                    <select className="px-2 py-1 border-2 border-gray-700 rounded-lg " value={selectedQuestion.format} onChange={(e) => handleChangeQuestionFormat(e)}>
                      {QUESTION_TYPES.map((option, i) => {
                        return <option key={i} value={option}>{option}</option>
                      })}
                    </select>
                  </div>
                  {/* OPTIONS AND ANSWERS */}
                  {handleShowOptions()}
                  {handleShowAnswers()}
                  <div className="flex items-center justify-start w-full gap-5 ">
                    <div className="flex items-center justify-start w-2/5 gap-7 " >
                      <b>Points:</b>
                      <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" min={1} maxLength="3" value={selectedQuestion.points} onChange={(e) => {setSelectedQuestion({...selectedQuestion, points: parseInt(e.target.value)})}} type={"number"} step="1" autoComplete="points" />
                    </div>
                    <div className="flex items-center justify-start w-3/5 gap-7 " >
                      <b>Duration(secs):</b>
                      <input className="w-full px-2 py-1 border-2 border-gray-700 border-solid rounded-lg bg-slate-100" min={30} max={600} maxLength="3" value={selectedQuestion.timeLimit.duration} onChange={(e) => {setSelectedQuestion({...selectedQuestion, timeLimit: {...selectedQuestion.timeLimit, duration: e.target.value}})}} type={"number"} step="1" autoComplete="duration" />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-2 border-t border-solid rounded-b border-slate-200 h-1/6">
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-700 rounded shadow-md outline-none active:bg-red-600 shadow-black focus:outline-none"
                    type="button"
                    onClick={(handleDeleteQuestion)}
                  >
                    DELETE
                  </button>
                  <div>
                    <button
                      className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                      type="button"
                      onClick={() => setShowQuestionModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-green-800 rounded shadow-md outline-none active:bg-green-600 shadow-black focus:outline-none"
                      type="button"
                      onClick={handleSaveQuestion}
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
        {showResultsModal && <>
          <div className="fixed inset-0 z-50 flex items-center justify-center max-h-screen outline-none focus:outline-none">
            <div className="relative w-full h-full">
              {/*content*/}
              <div className="relative flex flex-col w-full h-full bg-green-200 border-0 outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-center justify-between p-2">
                  <h3 className="px-4 text-3xl font-semibold">
                    Results
                  </h3>
                  <button
                    className="float-right p-1 text-3xl font-semibold leading-none border-0 outline-none "
                    onClick={() => setShowResultsModal(false)}
                  >
                    <XIcon width={25} />
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex flex-col items-start justify-start h-full max-h-full overflow-y-auto bg-gradient-to-r from-emerald-700 to-green-700">
                  {/* HERE */}
                  {/* CONTROLS */}
                  <div className="flex flex-col items-center justify-start w-full gap-6 px-2 py-5">
                    <div className="flex items-center justify-between w-full px-2 py-2 bg-green-900 rounded-full">
                      <div className="px-6 text-3xl font-bold text-gray-100">Submissions</div>
                      <div className="flex items-center justify-center gap-2 rounded-full ">
                        <b className="text-lg text-white">Search: </b>
                        <input type={"text"} value={filterResults} onChange={(e)=>{setFilterResults(e.target.value)}} className="p-2 rounded-full shadow-md shadow-black" placeholder="Enter a name"/>
                      </div>
                      <div onClick={()=> {
                        handleGenerateAnalytics()
                        setShowAnalyticModal(true)
                      }} className="flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-green-100 rounded-full shadow-md cursor-pointer shadow-black w-fit">
                        Analytics
                      </div>
                    </div>
                    {/* ITEMS */}
                    <div className="flex flex-wrap items-start justify-center gap-3 ">
                    {selectedQuiz.submission.filter((ans) => {
                      return ans.nickname.toLowerCase().includes(filterResults.toLowerCase())
                    }).length !== 0
                      ? selectedQuiz.submission.filter((ans) => {
                        return ans.nickname.toLowerCase().includes(filterResults.toLowerCase())
                      }).map( (submission, i) =>
                        <div onClick={()=>{}}  key={i} className="flex flex-col items-start justify-start gap-2 p-4 bg-green-200 border-transparent border-green-200 shadow-md shadow-black w-80 h-fit rounded-3xl " >
                          <div className="flex gap-2 text-left">
                            <b>Nickname: </b>
                            <div>{submission.nickname}</div>
                          </div>
                          <div>
                            <b># of Questions: </b>
                            <b>{selectedQuiz.questions.length}</b>
                          </div>
                          <div className="flex w-full gap-5 text-left ">
                            <div className="w-1/2">
                              <b># Correct : </b>
                              <b>{submission.answers.filter((answer, i) => {
                                    return answer.evaluation
                                }).length
                                }
                              </b>
                            </div>
                            <div className="w-1/2">
                              <b># Incorrect : </b>
                              <b>{ selectedQuiz.questions.length - submission.answers.filter((answer, i) => {
                                    return answer.evaluation
                                }).length
                                }
                              </b>
                            </div>
                          </div>
                          <div>
                            <b>Total Score: </b>
                            <b>{submission.totalScore}</b> / {selectedQuiz.totalPoints}
                          </div>
                          <div className='flex flex-col w-full gap-2 '>
                              <div className='flex w-full'>
                                  <b>Summary: </b>
                              </div>
                              <div className='flex flex-wrap items-start justify-start w-full gap-4'>
                                  {
                                      submission.answers.map((answer, i) => {
                                          if(answer.evaluation){
                                              return <div key={i} className="flex items-center gap-1">{i+1}: <CheckCircleIcon width={25} color={'green'}/> </div>
                                          }
                                          return <div key={i} className="flex">{i+1}: <XCircleIcon width={25} color={'red'}/></div>
                                      })
                                  }
                              </div>
                          </div>
                        </div>
                      )
                      : <p className="text-xl font-bold text-white">
                        Empty List
                      </p>}
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-2 border-t border-solid rounded-b border-slate-200">
                  <div className="flex items-center gap-5">
                    <div>Status: <b>{selectedQuiz.state}</b></div>
                    <div># Completed: <b>{selectedQuiz.results.noOfCompletion}</b></div>
                  </div>
                  <div>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-700 rounded shadow-md outline-none shadow-black active:bg-red-600 focus:outline-none"
                      type="button"
                      onClick={() => setShowResultsModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>}
        {showAnalyticModal && <>
          <div className="fixed inset-0 z-50 flex items-center justify-center max-h-screen outline-none focus:outline-none">
            <div className="relative w-full h-full">
              {/*content*/}
              <div className="relative flex flex-col w-full h-full bg-green-200 border-0 outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-center justify-between p-2">
                  <h3 className="px-4 text-3xl font-semibold">
                    Analytics
                  </h3>
                  <button
                    className="float-right p-1 text-3xl font-semibold leading-none border-0 outline-none "
                    onClick={() => setShowAnalyticModal(false)}
                  >
                    <XIcon width={25} />
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex flex-col items-start justify-start h-full max-h-full overflow-y-auto bg-gradient-to-r from-emerald-700 to-green-700">
                  {/* CONTROLS */}
                  <div className="flex flex-col items-center justify-start w-full gap-6 px-2 py-5">
                    {/* ITEMS */}
                    <div className="flex flex-wrap items-start justify-center gap-3 ">
                      {/* CARD */}
                      <div className="flex flex-col items-center justify-center gap-2 p-4 bg-green-200 border-transparent border-green-200 shadow-md shadow-black w-fit h-fit rounded-3xl " >
                        {/* TITLE */}
                        <div className="text-xl font-bold">
                          Performance of participants in each question
                        </div>
                        <BarChart
                          width={900}
                          height={430}
                          data={analytics.bar}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 15,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="Name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Correct" stackId="a" fill="#232f6b" />
                          <Bar dataKey="Incorrect" stackId="a" fill="#d63838" />
                        </BarChart>
                      </div>
                      {/* CARD */}
                      <div className="flex flex-col items-center justify-center gap-2 p-4 bg-green-200 border-transparent border-green-200 shadow-md shadow-black w-fit h-fit rounded-3xl " >
                        {/* TITLE */}
                        <div className="px-16 text-xl font-bold">
                          Ranking of participants
                        </div>
                        <div className='flex flex-col w-full gap-2 text-left '>
                          <div className='flex text-center'>
                            <b className='w-1/4'>Rank</b>
                            <b className='w-1/4'>Name</b>
                            <b className='w-1/4'>Points</b>
                            <b className='w-1/4'>Correct</b>
                          </div>
                          {analytics.ranking.sort((a, b) => b.score - a.score).map((user, i) => {
                            return <>
                              <div key={i} className='flex text-center'>
                                <b className='w-1/4'>{i+1}</b>
                                <span className='w-1/4'>{user.name}</span>
                                <span className='w-1/4'>{user.score}</span>
                                <span className='w-1/4'>{user.correctAnswer} / {selectedQuiz.questions.length}</span>
                              </div>
                            </>
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid rounded-b border-slate-200">
                  <div>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-700 rounded shadow-md outline-none shadow-black active:bg-red-600 focus:outline-none"
                      type="button"
                      onClick={() => setShowAnalyticModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>}
    </>);
}


export default QuizList;