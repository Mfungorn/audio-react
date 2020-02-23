import {AudioContextProvider} from "../context/AudioContext";
import {Route, Router} from "react-router-dom";
import {history} from "../helpers";
import * as React from "react";
import {RegisterPage} from "./SignUpPage/RegisterPage";
import {LoginPage} from "./LoginPage/LoginPage";
import {ProvideAuth} from "../context/AuthContext";
import {Home} from "./HomePage/Home";
import {Authorize} from "./Authorize";
import {AuthorPage} from "./Author/AuthorPage";


export const Root = (props) => {
    return (
        <AudioContextProvider>
            <ProvideAuth>
                <Router history={history}>
                    <Route exact path="/register" component={RegisterPage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Authorize>
                        <Route path="/" component={Home}/>
                        <Route path="/authors/:id" component={AuthorPage}/>
                    </Authorize>
                </Router>
            </ProvideAuth>
        </AudioContextProvider>
    );
};