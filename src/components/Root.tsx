import {AudioContextProvider} from "../context/AudioContext";
import {Route, Router} from "react-router-dom";
import {history} from "../helpers";
import * as React from "react";
import {RegisterPage} from "./SignUpPage/RegisterPage";
import {LoginPage} from "./LoginPage/LoginPage";
import AuthenticatedRoute from "./AuthenticatedRoute";
import {ProvideAuth} from "../context/AuthContext";
import {Home} from "./LoginPage/Home";


export const Root = (props) => {
    return (
        <AudioContextProvider>
            <ProvideAuth>
                <Router history={history}>
                    <AuthenticatedRoute path="/" component={Home}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/login" component={LoginPage}/>
                </Router>
            </ProvideAuth>
        </AudioContextProvider>
    );
};