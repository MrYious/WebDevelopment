import './App.css';

import { Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import User from './pages/User';

function App() {
  return (
    <Routes>

      {/* Main */}
      <Route path="/" element={<Home />}>
        {/* Hero */}
        <Route index element={<>Index</>} />
        {/* USER LOGIN REGISTER */}
        <Route path="user" element={<User/>} >
          <Route index element={<SignIn/>} />
          <Route path="signup" element={<SignUp/>} />
        </Route>
      </Route>

      {/* DASHBOARD (LOGGED IN) */}
      <Route path="manage" element={<></>} />

      {/* QUIZ JOIN & ID */}
      <Route path="quiz" element={<></>} />
      <Route path="*" element={<div>Wrong</div>} />
    </Routes>
  );
}

export default App;
