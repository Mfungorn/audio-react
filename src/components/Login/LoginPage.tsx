import * as React from 'react';
import {useReducer} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router";
import {ThemedButton} from "../ThemedButton";
import {Button, CircularProgress, Grid} from "@material-ui/core";
import {useApi} from "../../api/ApiContext";
import {Redirect} from "react-router-dom";
import {Routes} from "../../Routes";
import {toast} from "react-toastify";
import "./LoginPage.css";

interface IState {
    loading: boolean;
    email: string;
    password: string;
    loggedIn: boolean;
    error?: string;
}

type Action =
    | { type: "loginSuccess" }
    | { type: "loginFail" };

const reducer = (state: IState, action: Action) => {
    switch (action.type) {
        case "loginSuccess":
            toast.done("Login succeeded");
            return {...state, loading: false, loggedIn: true};
        case "loginFail":
            toast.error("Wrong email or password");
            return {...state, loading: false, error: "Wrong email or password"};
    }
};

const initialState = {
    loading: false,
    email: "",
    password: ""
} as IState;

export const LoginPage = () => {
    const auth = useApi();
    initialState.loggedIn = auth.userSession != null;
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleLogin = (email: string, password: string) => {
        auth.login({
            email: email,
            password: password
        }).then(response => {
            dispatch({
                type: "loginSuccess"
            });
        }).catch(error => {
            dispatch({
                type: "loginFail"
            })
        });
    };

    const history = useHistory();

    const onSignUpButtonClicked = (event: any) => {
        history.push(Routes.register)
    };

    return state.loggedIn
        ? <Redirect to={Routes.home}/>
        : (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{
                    minHeight: '100vh',
                    minWidth: '100vh',
                    backgroundColor: 'lightgray'
                }}
            >
                <Grid item style={{
                    width: '25%'
                }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h5">
                                Login
                            </Typography>
                            <Formik
                                initialValues={{email: '', password: ''}}
                                validationSchema={
                                    Yup.object().shape({
                                        email: Yup.string().required('Email is required'),
                                        password: Yup.string().required('Password is required')
                                    })}
                                onSubmit={
                                    ({email, password}, {setStatus, setSubmitting}) => {
                                        setStatus();
                                        handleLogin(email, password);
                                        setSubmitting(state.loading);
                                        setStatus(state?.error)
                                    }}
                                render={
                                    ({errors, status, touched, isSubmitting}) => (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address</label>
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                                />
                                                <ErrorMessage name="email" component="div"
                                                              className="invalid-feedback"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                                                />
                                                <ErrorMessage name="password" component="div"
                                                              className="invalid-feedback"/>
                                            </div>
                                            <div className="form-group">
                                                {isSubmitting
                                                    ? <CircularProgress size={24}/>
                                                    : (
                                                        <ThemedButton
                                                            type="submit"
                                                            className="btn btn-primary"
                                                            disabled={isSubmitting}
                                                        >
                                                            Login
                                                        </ThemedButton>
                                                    )}
                                                <Button onClick={onSignUpButtonClicked} style={{marginTop: 16}}>
                                                    <span>Haven't an account yet?</span>
                                                </Button>
                                            </div>
                                            {status && <div className={'alert alert-danger'}>{status}</div>}
                                        </Form>
                                    )}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
};
