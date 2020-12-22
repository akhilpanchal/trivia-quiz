import React from "react";
import { Layout } from "antd";
import { HeartFilled } from "@ant-design/icons";
import {BrowserRouter, Switch} from "react-router-dom";

import "antd/dist/antd.css";
import "./styles/App.css";

import { getUserPref } from "./service/localStorage";
import UserPrefContext from "./UserPrefContext";
import { RouteAuthenticated, RouteUnauthenticated} from "./components/routeUtils"
import Signup from "./components/Signup";
import Quiz from "./components/Quiz";
import Welcome from "./components/Welcome";

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
                    <Layout>
                        <Header></Header>
                        <Content style={{ padding: '0 50px' }}>
                            <div className="site-layout-content">
                                <Switch>
                                    <RouteUnauthenticated path="/signup" component={Signup} />
                                    <RouteAuthenticated path="/quiz" component={Quiz} />
                                    <RouteAuthenticated path="/dashboard" component={Welcome} />
                                </Switch>
                            </div>
                        </Content>
                    </Layout>
                </div>
                    <Footer style={{ textAlign: 'center' }}>Made with <HeartFilled /> by Algorythm</Footer>
            </UserPrefContext.Provider>
            
        </BrowserRouter>
    );
}

export default App;
