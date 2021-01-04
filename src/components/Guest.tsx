import { UserOutlined } from "@ant-design/icons";
import { Button, Input, Result } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Guest = () => {
    const [guestName, setGuestName] = React.useState("");
    const [error, setError] = React.useState(false);

    const history = useHistory();

    const handleNameChange = React.useCallback((e) => {
        setGuestName(e.target.value);
        setError(false);
    }, []);

    const handleStartQuiz = React.useCallback(() => {
        if (guestName === "") {
            setError(true);
        } else {
            history.push("/quiz");
        }
    }, [guestName, history]);

    return (
        <Result
            icon={<UserOutlined />}
            title="How should we address you?"
            extra={
                <>
                    <Input
                        style={{width: "300px", color: `${error ? "red" : ""}` }}
                        placeholder={error ? "A name is required" : ""}
                        allowClear
                        prefix={<UserOutlined />}
                        onChange={handleNameChange}
                    />
                    <br />
                    <br />
                    <Button onClick={handleStartQuiz} type="primary">Start Quiz</Button>
                </>
            }
        />
    );
};

export default Guest;