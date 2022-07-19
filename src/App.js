import './App.css';

import { Route, Routes } from "react-router-dom";

import About from './pages/About';
import Error404 from './pages/Error404';
import Features from './pages/Features';
import Hero from './pages/Hero';
import Home from './pages/Home';
import Host from './pages/Host';
import Landing from './pages/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import User from './pages/User';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  return(<>
    UserID = {userId}
  </>)
}

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Landing/>} />

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
        <Route index element={<>List of Quiz</>} />
        <Route path="quiz" element={<>Manage Quiz</>} >
          <Route index element={<>Information</>} />
          <Route path="create" element={<>Create quiz</>} />
          <Route path="edit" element={<>Edit quiz</>} />
        </Route>
      </Route>

      {/* QUIZ ROOM */}
      <Route path="quiz">
        <Route index path=":userId" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Error404/>} />
    </Routes>
  )
}

export default App;