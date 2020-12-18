import "antd/dist/antd.css";
import "./App.css";
import React from "react";
import { Layout, Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import Signup from "./Signup";
import { getUserPref } from "./service/localStorage";

const { Footer, Content } = Layout;

function App() {
    const userPref = React.useMemo(() => {
        const value = getUserPref();
        return value ? JSON.parse(value) : null;
    }, []);

    return (
        <div className="App">
            {userPref ? (
                <>
                    <h1>Welcome back, {userPref.userName}!</h1>
                    <Button type="primary">Continue to Quiz</Button>
                </>
            ) : (
                <>
                    <h1>Welcome to Trivia Qwiz</h1>
                    <Signup />
                </>
            )}
        </div>
    );
}

export default App;
