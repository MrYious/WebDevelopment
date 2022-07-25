import { useContext, useEffect, useState } from "react";

import Axios from "../service/Axios"
import { PlusCircleIcon } from "@heroicons/react/outline";
import { UserContext } from "../context/UserContext";
import { useOutletContext } from "react-router-dom";

const QuizList = () => {
    const contextData = useContext(UserContext);
    const [message, setMessage] = useOutletContext();
    const [showModal, setShowModal] = useState(false);
    console.log("Render QuizList", contextData);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
      console.log("Quiz List Effect:", contextData.listQuizzes);
    }, [])


    const handleSaveChanges = () => {
        console.log("Save");
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
          setShowModal(false);
          setMessage(data.msg);
        })
        .catch(function (error) {
          // FAIL
          console.log("Cant save data")
          setMessage(error.msg);
        });
    };

    return (<>
        <div className="flex flex-col items-center justify-start w-full h-full gap-2 py-4 overflow-y-auto">
            <div className="py-5 text-5xl font-bold">
                My Quizzes
            </div>
            <div className="flex justify-start gap-6 p-2 text-left bg-gray-200 rounded-full w-fit">
                <button onClick={() => setShowModal(true)} className="flex items-center justify-center gap-2 p-2 bg-gray-300 rounded-full w-fit hover:bg-gray-400">
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
                      return <div key={i} className="flex flex-col justify-center gap-4 p-4 border-2 rounded-md cursor-pointer w:80 md:w-72 lg:w-60 bg-slate-100 hover:border-orange-600">
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
        {showModal ? (
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
                    onClick={() => setShowModal(false)}
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
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
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