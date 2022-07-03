const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const Hero = () => {
  return (<>
    <div className='flex flex-col justify-start items-start bg-slate-200 h-screen'>
      {/* NAVBAR */}
      <div className="flex justify-between items-center w-full h-16 border-black border-b-2 px-8 bg-indigo-200">
        <div className="flex items-center gap-16 bg-red-400">
          <div className=" font-bold">
            Quiz Maker
          </div>
          <div className="flex gap-4 h-9">
            <button className="h-full w-20 border-black border-2 ">Home</button>
            <button className="h-full w-20 border-black border-2 ">Features</button>
            <button className="h-full w-20 border-black border-2 ">About</button>
          </div>
        </div>
        <button className="w-20 h-9 border-black border-2 ">
          Login
        </button>
      </div>
      {/* CONTENT */}
      <div>
      </div>
    </div>
  </>)
}

export default Hero;