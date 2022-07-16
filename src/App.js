import './App.css';

import { Route, Routes } from "react-router-dom";

import About from './pages/About';
import Features from './pages/Features';
import Hero from './pages/Hero';
import Home from './pages/Home';
import Landing from './pages/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import User from './pages/User';

function App() {
  return (
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
  );
}

export default App;
