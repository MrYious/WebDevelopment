import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "../context/UserContext";

const links = [
  { name: 'Home', to: '/home' },
  { name: 'Features', to: 'features' },
  { name: 'About', to: 'about' },
]

const Home = () => {

  const contextData = useContext(UserContext);
  console.log("Render Home", contextData);

  useEffect(() => {
    console.log("Home Effect:");
    contextData.toggleCheckLogin();
  }, [])

  return (<>
    <div className='flex flex-col items-center justify-center h-screen text-white bg-gray-300 bg-gradient-to-r from-emerald-800 to-green-800'>
      {/* NAVBAR */}
      <div className="flex items-center justify-between w-full px-3 py-2">
        {/* ICON */}
        <Link to={'/'} className="flex items-center w-1/6 text-4xl font-bold">
          SmartQ
        </Link>
        {/* LINKS */}
        <div className="flex items-center justify-end w-5/6 h-full gap-5 text-white">
          {links.map((link, i) => {
            return <Link to={link.to} key={i} className="flex items-center gap-1 px-2 py-2 text-lg font-medium rounded-full w-fit">
              {link.name}
            </Link>
          })}
          {contextData.isLoggedIn
            ? <Link to={'/host'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-100 bg-gray-900 rounded-full w-fit">
                {contextData.user.nickname}
              </Link>
            : <Link to={'user/'} className="flex items-center gap-1 px-4 py-2 text-lg font-medium text-gray-100 bg-gray-900 rounded-full w-fit">
                Sign In
              </Link>
          }
        </div>
      </div>
      {/* CONTENT */}
      <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-[#628F83] to-[#004643]">
        <Outlet/>
      </div>
    </div>
  </>)
}

export default Home;