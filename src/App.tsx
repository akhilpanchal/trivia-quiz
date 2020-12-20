import React from "react";
import { Layout, Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import {BrowserRouter, Link, Route, Switch, useHistory} from "react-router-dom";

import "antd/dist/antd.css";
import "./App.css";

import UserPrefContext from "./UserPrefContext";
import Signup from "./Signup";
import { getUserPref } from "./service/localStorage";
import Question from "./Question";
import Welcome from "./Welcome";

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
                                    <Route path="/signup">
                                        <Signup />
                                    </Route>
                                    <Route path="/quiz">
                                        <Question />
                                    </Route>
                                    <Route path="">
                                        <Welcome />
                                    </Route>
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
