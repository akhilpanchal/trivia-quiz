import { HomeTwoTone } from "@ant-design/icons";
import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Result
            icon={<HomeTwoTone />}
            title="Hey there, Welcome to Trivia Quiz!"
            extra={
                <>
                    <Link to="/guest"><Button>Continue as Guest</Button></Link>
                    <Link to="/login"><Button type="primary">Login</Button></Link>
                </>
            }
        />
    );
};

export default Home;