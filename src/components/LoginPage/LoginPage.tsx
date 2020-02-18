import * as React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {authenticationService} from '../../services';
import {RouteComponentProps, useHistory} from "react-router";
import {ThemedButton} from "../ThemedButton";
import {useEffect} from "react";
import {CircularProgress, Grid} from "@material-ui/core";


interface RouterProps {
    title: string;   // This one is coming from the router
}

interface Props extends RouteComponentProps<RouterProps> {
    // Add your regular properties here
}

export const LoginPage = (props: Props) => {
    let history = useHistory();
    useEffect(() => {
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            history.push('/');
        }
    });

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: '100vh'}}
        >
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h5">
                            Login
                        </Typography>
                        <button onClick={(e) => {
                            props.history.push("/register")
                        }
                        }>
                            Haven't an account yet?
                        </button>
                        <Formik
                            initialValues={
                                {email: '', password: ''}
                            }
                            validationSchema={
                                Yup.object().shape({
                                    email: Yup.string().required('Email is required'),
                                    password: Yup.string().required('Password is required')
                                })}
                            onSubmit={
                                ({email, password}, {setStatus, setSubmitting}) => {
                                    setStatus();
                                    authenticationService.login(email, password)
                                        .then(
                                            user => {
                                                const {from}: any = props.location.state || {from: {pathname: "/"}};
                                                props.history.push(from);
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
                                            <ThemedButton
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={isSubmitting}
                                            >
                                                Login
                                            </ThemedButton>
                                            {isSubmitting && <CircularProgress />}
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