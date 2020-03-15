import {AudioContextProvider} from "../context/AudioContext";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {history} from "../helpers";
import * as React from "react";
import {RegisterPage} from "./SignUpPage/RegisterPage";
import {LoginPage} from "./LoginPage/LoginPage";
import {ProvideAuth} from "../context/AuthContext";
import {Home} from "./HomePage/Home";
import {AuthorPage, AuthorPageProps} from "./AuthorPage/AuthorPage";
import {Profile} from "./Profile/Profile";
import {AlbumPage, AlbumPageProps} from "./AlbumPage/AlbumPage";
import AuthenticatedRoute from "./Authentication/AuthenticatedRoute";
import {NoMatch} from "./NoMatch/NoMatch";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme, CssBaseline} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

export const Root = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AudioContextProvider>
                <ProvideAuth>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/register" component={RegisterPage}/>
                            <Route exact path="/login" component={LoginPage}/>
                            {/*<Authorize>*/}
                            <AuthenticatedRoute path="/user/profile" render={() => <Profile/>}/>
                            <AuthenticatedRoute path="/" render={() => <Home/>}/>
                            <AuthenticatedRoute path="/authors/:id"
                                                render={(props: AuthorPageProps) => <AuthorPage id={props.id}/>}/>
                            <AuthenticatedRoute path="/albums/:id"
                                                render={(props: AlbumPageProps) => <AlbumPage id={props.id}/>}/>
                            <AuthenticatedRoute path="/notfound" exact render={() => <NoMatch/>}/>
                            <Redirect to="/notfound"/>
                            {/*</Authorize>*/}
                        </Switch>
                    </Router>
                </ProvideAuth>
            </AudioContextProvider>
        </ThemeProvider>
    );
};
