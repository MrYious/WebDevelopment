import './App.css';

import { Route, Routes } from "react-router-dom";

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
        {/* Hero */}
        <Route index element={<>Hero Banner</>} />
        {/* Account Login and Creation */}
        <Route path="user" element={<User/>} >
          <Route index element={<SignIn/>} />
          <Route path="signup" element={<SignUp/>} />
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
