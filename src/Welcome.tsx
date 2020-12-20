import { Button } from "antd";
import React from "react";
import {Link, Redirect} from "react-router-dom";
import UserPrefContext from "./UserPrefContext"


const Welcome = () => {
    const userPref = React.useContext(UserPrefContext);

    if (!userPref) {
        return <Redirect to={"/signup"} />
    }

    return (
        <>
            <h1>Welcome back, {userPref?.userName}!</h1>
            <Link to="/quiz"><Button type="primary">Continue to Quiz</Button></Link>
        </>
    )
};

export default Welcome;