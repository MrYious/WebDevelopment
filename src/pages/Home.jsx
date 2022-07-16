import { Link, Outlet } from "react-router-dom";

import logo from '../assets/SmartQ.png';

const links = [
  { name: 'Home', to: '/home' },
  { name: 'Features', to: 'features' },
  { name: 'About', to: 'about' },
]


const Home = () => {
  return (<>
    <div className='flex flex-col h-screen bg-gray-300'>
      {/* NAVBAR */}
      <div className="flex w-full h-16 px-8 border-black ">
        {/* ICON */}
        <div className="flex items-center w-1/6 font-bold">
          <img src={logo} alt="SmartQ Logo" className="h-12"/>
        </div>
        {/* LINKS */}
        <div className="flex items-center justify-end w-5/6 h-full gap-4 text-gray-800">
          {/* SCROLL */}
          {links.map((link, i) => {
            return <Link to={link.to} key={i}>
              <button className="px-3 py-2 font-bold rounded-3xl">{link.name}</button>
            </Link>
          })}
          {/* ACCOUNT */}
          <Link to='user/'>
            <button className="px-4 py-2 font-bold text-black bg-orange-600 rounded-3xl">
              Sign In
            </button>
          </Link>
        </div>
      </div>
      {/* CONTENT */}
      <div className="flex items-center justify-center w-full h-full">
        <Outlet/>
      </div>
    </div>
  </>)
}

export default Home;