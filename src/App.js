import './App.css';

import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';

import About from './pages/About';
import Axios from "./service/Axios";
import Error404 from './pages/Error404';
import Features from './pages/Features';
import Hero from './pages/Hero';
import Home from './pages/Home';
import Host from './pages/Host';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import QuizList from './components/QuizList';
import QuizManage from './components/QuizManage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TheRoom from './components/TheRoom';
import User from './pages/User';
import { UserContext } from './context/UserContext';

const App = () => {
  console.log("Render App");
  const [data, setData] = useState({
    isLoggedIn: false,
    user: {},
    listQuizzes: [],
    toggleCheckLogin: () => {
      Axios.get('http://localhost:5000/user/isAuth')
      .then(function (response) {
        // SUCCESS
        let user =  response.data;
        setData({...data, isLoggedIn: true, user})
        console.log(response.data.nickname, " is logged in")
        Axios.get('http://localhost:5000/quiz/')
        .then(function (response) {
            // SUCCESS
            let list = response.data;
            setData(prev => {return {...prev, listQuizzes: [...list]}})
            console.log("List of quizzes", list);
        })
        .catch(function (error) {
            // FAIL
            console.log("Error: No record found", error)
        });
      })
      .catch(function (error) {
        // FAIL
        console.log("No user in session")
      });
    },
    toggleUpdateUser: (arr) => {
      setData({...data, user: arr})
    },
    toggleUpdateList: (arr) => {
      setData({...data, listQuizzes: [...arr]})
    },
    toggleLogout : () => {
      setData({...data, isLoggedIn: false, user: {}})
    }
  })

  useEffect( () => {
    console.log("App Effect:");
  }, [])

  return (
    <UserContext.Provider value={data}>
      <Routes>
        <Route path="/" element={<Landing/>} />

        {/* QUIZ ROOM */}
        <Route path="quiz/:roomID" element={<Quiz/>}>
          <Route path=":userID" element={<TheRoom/>}/>
        </Route>

        {/* HOME */}
        <Route path="home" element={<Home />}>
          <Route index element={<Hero/>} />
          <Route path="features" element={<Features/>} />
          <Route path="about" element={<About/>} />
          <Route path="user" element={<User/>} >
            <Route index element={<SignIn/>} />
            <Route path="new" element={<SignUp/>} />
          </Route>
        </Route>

        {/* DASHBOARD (LOGGED IN) */}
        <Route path="host" element={<Host/>} >
          <Route index element={<QuizList/>} />
        </Route>

        <Route path="*" element={<Error404/>} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App;