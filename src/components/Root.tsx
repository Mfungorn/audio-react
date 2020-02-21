import {AudioContextProvider} from "../context/AudioContext";
import {Route, Router} from "react-router-dom";
import {history} from "../helpers";
import * as React from "react";
import {RegisterPage} from "./SignUpPage/RegisterPage";
import {LoginPage} from "./LoginPage/LoginPage";
import {ProvideAuth} from "../context/AuthContext";
import {Home} from "./LoginPage/Home";
import {Authorize} from "./Authorize";


export const Root = (props) => {
    return (
        <AudioContextProvider>
            <ProvideAuth>
                <Router history={history}>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Authorize>
                        <Route path="/" component={Home}/>
                    </Authorize>
                </Router>
            </ProvideAuth>
        </AudioContextProvider>
    );
};