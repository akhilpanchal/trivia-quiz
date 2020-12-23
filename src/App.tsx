import React from "react";
import { Layout } from "antd";
import { HeartFilled } from "@ant-design/icons";
import {BrowserRouter, Switch} from "react-router-dom";

import "antd/dist/antd.css";
import "./styles/App.css";

import { getUserPref } from "./service/localStorage";
import UserPrefContext from "./UserPrefContext";
import { RouteAuthenticated, RouteUnauthenticated} from "./components/routeUtils"
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Signout from "./components/Signout";

const { Header, Content, Footer } = Layout;

function App() {
    const userPref = React.useMemo(() => {
        const value = getUserPref();
        return value ? JSON.parse(value) : null;
    }, []);

    return (
        <BrowserRouter>
            <UserPrefContext.Provider value={userPref}>
                <div className="App">
                    <Signout />
                    <Layout>
                        <div className="site-layout-content">
                            <Switch>
                                <RouteUnauthenticated path="/login" component={Login} />
                                <RouteAuthenticated path="/dashboard" component={Welcome} />
                                <RouteUnauthenticated path="/quiz" component={Quiz} />
                                <RouteUnauthenticated path="" component={Home} />
                            </Switch>
                        </div>
                    </Layout>
                </div>
                <Footer style={{ textAlign: 'center', backgroundColor: "transparent" }}>Made with <HeartFilled style={{color: "#4282c6"}} /> by <a href="www.github.com/akhilpanchal">Algorythm</a></Footer>
            </UserPrefContext.Provider>
            
        </BrowserRouter>
    );
}

export default App;
