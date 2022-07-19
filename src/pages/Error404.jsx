import { Link } from "react-router-dom";

const Error404 = () => {

    return (<>
        <div className="flex flex-col items-center justify-center w-full h-screen gap-5 bg-gray-300">
            <div className="py-3 text-8xl">Oops!</div>
            <div className="text-2xl">It seems the link you're looking for doesn't exist!</div>
            <div className="text-xl"><b>Error 404:</b> {window.location.href}</div>
            <Link to={'/'} className="p-2 text-xl bg-green-400 border-2 border-black rounded-full">
                Go Home
            </Link>
        </div>
    </>);
}

export default Error404;