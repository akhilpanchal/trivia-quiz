import React from "react";
import { Layout, Spin } from "antd";
import { HeartFilled } from "@ant-design/icons";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import "antd/dist/antd.css";
import "./styles/App.css";

import CurrentUserContext from "./CurrentUserContext";
import { RouteAuthenticated, RouteUnauthenticated} from "./components/routeUtils"
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Signout from "./components/Signout";
import firebase from "firebase";
import Guest from "./components/Guest";

const { Footer } = Layout;

function App() {
    const [ready, setReady] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<any>(null);

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setReady(true);
        });
    }, []);

    return (
        <BrowserRouter>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="App">
                    { ready ?
                        <>
                            <Signout />
                            <Layout>
                                <div className="site-layout-content">
                                    <Switch>
                                        <RouteUnauthenticated path="/login" component={Login} />
                                        <RouteUnauthenticated path="/guest" component={Guest} />
                                        <RouteAuthenticated path="/dashboard" component={Welcome} />
                                        <Route path="/quiz" component={Quiz} />
                                        <RouteUnauthenticated path="" component={Home} />
                                    </Switch>
                                </div>
                            </Layout>
                        </> :
                        <Spin size="large" />
                    }
                </div>
                <Footer style={{ textAlign: 'center', backgroundColor: "transparent" }}>Made with <HeartFilled style={{color: "#4282c6"}} /> by <a href="www.github.com/akhilpanchal">Alg0Rythm</a></Footer>
            </CurrentUserContext.Provider>
            
        </BrowserRouter>
    );
}

export default App;
