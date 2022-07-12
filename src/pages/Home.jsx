import { Link, Outlet } from "react-router-dom";

const links = [
  { name: 'Home', to: '/' },
  { name: 'Features', to: '/' },
  { name: 'About', to: '/' },
]


const Home = () => {
  return (<>
    <div className='flex flex-col bg-slate-100 h-screen'>
      {/* NAVBAR */}
      <div className="flex w-full h-16 px-8 py-3 border-black border-b-2 bg-indigo-300">
        {/* ICON */}
        <div className="flex items-center font-bold w-1/6">
          Quiz Makers
        </div>
        {/* LINKS */}
        <div className="flex justify-between gap-4 h-full w-5/6 ">
          {/* SCROLL */}
          <div className="flex gap-8">
            {links.map((link, i) => {
              return <Link to='' key={i}>
                <button className="h-full px-3 rounded-3xl font-bold">{link.name}</button>
              </Link>
            })}
          </div>
          {/* ACCOUNT */}
          <div>
            <Link to='user/signup'>
              <button className="h-full px-4 py-1 rounded-3xl font-bold">
                Register
              </button>
            </Link>
            <Link to='user/'>
              <button className="h-full px-4 py-1 border-black border-2 rounded-3xl font-bold">
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