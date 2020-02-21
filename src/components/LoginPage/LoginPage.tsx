import * as React from 'react';
import {useCallback} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps, useHistory, useLocation} from "react-router";
import {ThemedButton} from "../ThemedButton";
import {Button, CircularProgress, Grid} from "@material-ui/core";
import {useAuth} from "../../context/AuthContext";


interface RouterProps {
    title: string;   // This one is coming from the router
}

interface Props extends RouteComponentProps<RouterProps> {
    // Add your regular properties here
}

export const LoginPage = (props: Props) => {
    // const {
    //     state,
    //     dispatch,
    //     currentUser,
    //     loading,
    //     error,
    //     data,
    // } = useContext(AudioContext);

    const {user, signIn} = useAuth();
    console.log('sign in', signIn);

    let history = useHistory();
    let location = useLocation();

    const onSignUpButtonClicked = useCallback((e) => {
        history.push("/register")
    }, [history]);

    const onLoginSubmit = useCallback(() => {
        const {from}: any = location.state || {from: {pathname: "/"}};
        history.push(from);
    }, [history, location]);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{
                minHeight: '100vh',
                minWidth: '100vh'
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
                                    signIn(email, password)
                                        .then(
                                            user => {
                                                onLoginSubmit()
                                            },
                                            error => {
                                                setSubmitting(false);
                                                setStatus(error);
                                            }
                                        );
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
                                            <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Field
                                                name="password"
                                                type="password"
                                                className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                                            />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback"/>
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
                                            <Button onClick={onSignUpButtonClicked}>
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
