import { Outlet, useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect } from "react";

// req.sessionID

const Host = () => {

    let navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:5001/api/isAuth')
        .then((res) => {
            // SUCCESS
            console.log(res.data.msg);
            alert("Success");
            navigate('/home/user');
        })
        .catch( (err) => {
            // FAIL
            alert("Error");
            console.log(err.response);
        });
    }, [])

    return (<>
        <div>
            Dashboard
        </div>
        <div>
            <Outlet />
        </div>
    </>);
}

export default Host;