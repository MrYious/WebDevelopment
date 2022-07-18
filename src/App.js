import './App.css';

import { Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';

import About from './pages/About';
import Features from './pages/Features';
import Hero from './pages/Hero';
import Home from './pages/Home';
import Landing from './pages/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import User from './pages/User';
import axios from "axios";

export const UserContext = createContext({})

const App = () => {
  const [userSession, setUserSession] = useState(true)

  // useEffect(() => {
  //   const fetchUserAuth = async () => {
  //     axios.post('http://localhost:5001/api/isAuth')
  //       .then(function (response) {
  //         // SUCCESS
  //         console.log(response.data.msg);
  //         alert("Reload");
  //       })
  //       .catch(function (error) {
  //         // FAIL
  //         alert("Error");
  //         console.log(error.response.data.msg);
  //     });
  //   }
  //   fetchUserAuth()
  // }, [])

  return (
    <UserContext.Provider value={userSession}>
      <Routes>
        <Route path="/" element={<Landing/>} />

        <Route path="/home" element={<Home />}>
          <Route index element={<Hero/>} />
          <Route path="features" element={<Features/>} />
          <Route path="about" element={<About/>} />
          <Route path="user" element={<User/>} >
            <Route index element={<SignIn/>} />
            <Route path="new" element={<SignUp/>} />
          </Route>
        </Route>

        {/* DASHBOARD (LOGGED IN) */}
        <Route path="host" element={<>Nav with Content</>} >
          <Route index element={<>List of Quiz</>} />
          <Route path="quiz" element={<>Manage Quiz</>} >
            <Route index element={<>Information</>} />
            <Route path="create" element={<>Create quiz</>} />
            <Route path="edit" element={<>Edit quiz</>} />
          </Route>
        </Route>
        <Route path="quiz/"></Route>
        <Route path="*" element={<div>Wrong</div>} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App;