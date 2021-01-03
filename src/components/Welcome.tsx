import { Button } from "antd";
import React from "react";
import {Link} from "react-router-dom";
import CurrentUserContext from "../CurrentUserContext"


const Welcome = () => {
    const userPref = React.useContext(CurrentUserContext);

    return (
        <>
            <h1>Welcome back, {userPref?.displayName}!</h1>
            <Link to="/quiz"><Button type="primary">Continue to Quiz</Button></Link>
        </>
    )
};

export default Welcome;