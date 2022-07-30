import { Link } from "react-router-dom";

const Error404 = () => {

    return (<>
        <div className="flex flex-col items-center justify-center w-full h-screen gap-5 text-white bg-gradient-to-r from-emerald-800 to-green-800">
            <div className="py-3 text-8xl">Oops!</div>
            <div className="text-2xl">It seems the link you're looking for doesn't exist!</div>
            <div className="text-xl"><b>Error 404:</b> {window.location.href}</div>
            <Link to={'/'} className="px-6 py-3 text-2xl bg-red-900 rounded-full shadow-md shadow-black">
                Go Home
            </Link>
        </div>
    </>);
}

export default Error404;