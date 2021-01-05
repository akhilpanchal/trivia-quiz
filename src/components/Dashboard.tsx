import { Button } from "antd";
import React from "react";
import { useHistory} from "react-router-dom";
import CurrentUserContext from "../CurrentUserContext"


const Dashboard = () => {
    const { displayName } = React.useContext(CurrentUserContext);

    const history = useHistory();

    const handleStartQuiz = React.useCallback(() => {
        // setUser({ email, score: 0 })
        history.push("/quiz");
    }, [history]);

    return (
        <>
            <h1>Welcome back, {displayName}!</h1>
            <Button type="primary" onClick={handleStartQuiz}>Continue to Quiz</Button>
        </>
    )
};

export default Dashboard;