import {AudioContextProvider} from "../context/AudioContext";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {history} from "../helpers";
import * as React from "react";
import {RegisterPage} from "./SignUpPage/RegisterPage";
import {LoginPage} from "./LoginPage/LoginPage";
import {ProvideAuth} from "../context/AuthContext";
import {Home} from "./HomePage/Home";
import {AuthorPage, AuthorPageProps} from "./Author/AuthorPage";
import {Profile} from "./Profile/Profile";
import {AlbumPage, AlbumPageProps} from "./Album/AlbumPage";
import AuthenticatedRoute from "./AuthenticatedRoute";
import {NoMatch} from "./NoMatch";


export const Root = (props) => {
    return (
        <AudioContextProvider>
            <ProvideAuth>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/register" component={RegisterPage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        {/*<Authorize>*/}
                        <AuthenticatedRoute path="/user/profile" render={() => <Profile/>}/>
                        <AuthenticatedRoute path="/" render={() => <Home/>}/>
                        <AuthenticatedRoute exact path="/authors/:id"
                                            render={(props: AuthorPageProps) => <AuthorPage id={props.id}/>}/>
                        <AuthenticatedRoute exact path="/albums/:id"
                                            render={(props: AlbumPageProps) => <AlbumPage id={props.id}/>}/>
                        <AuthenticatedRoute path="/notfound" exact render={() => <NoMatch/>}/>
                        <Redirect to="/notfound"/>
                        {/*</Authorize>*/}
                    </Switch>
                </Router>
            </ProvideAuth>
        </AudioContextProvider>
    );
};