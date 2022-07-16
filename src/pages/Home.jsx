import { Link, Outlet } from "react-router-dom";

const links = [
  { name: 'Home', to: '/' },
  { name: 'Features', to: '/' },
  { name: 'About', to: '/' },
]


const Home = () => {
  return (<>
    <div className='flex flex-col h-screen bg-slate-100'>
      {/* NAVBAR */}
      <div className="flex w-full h-16 px-8 py-3 bg-indigo-300 border-b-2 border-black">
        {/* ICON */}
        <div className="flex items-center w-1/6 font-bold">
          Quiz Makers
        </div>
        {/* LINKS */}
        <div className="flex justify-between w-5/6 h-full gap-4 ">
          {/* SCROLL */}
          <div className="flex gap-8">
            {links.map((link, i) => {
              return <Link to='' key={i}>
                <button className="h-full px-3 font-bold rounded-3xl">{link.name}</button>
              </Link>
            })}
          </div>
          {/* ACCOUNT */}
          <div>
            <Link to='user/signup'>
              <button className="h-full px-4 py-1 font-bold rounded-3xl">
                Register
              </button>
            </Link>
            <Link to='user/'>
              <button className="h-full px-4 py-1 font-bold border-2 border-black rounded-3xl">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <Outlet/>
    </div>
  </>)
}

export default Home;