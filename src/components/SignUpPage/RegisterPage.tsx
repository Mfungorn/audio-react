import * as React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {useHistory} from "react-router";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import {ThemedButton} from "../ThemedButton";
import {useAuth} from "../../context/AuthContext";


export const RegisterPage = () => {
    const history = useHistory();

    const {signUp} = useAuth();

    return (
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
                            Sign Up
                        </Typography>
                        <Formik
                            initialValues={{username: '', email: '', password: ''}}
                            validationSchema={
                                Yup.object().shape({
                                    username: Yup.string().required('Username is required'),
                                    email: Yup.string().required('Email is required'),
                                    password: Yup.string().required('Password is required')
                                })}
                            onSubmit={
                                ({username, email, password}, {setStatus, setSubmitting}) => {
                                    setStatus();
                                    signUp(username, email, password)
                                        .then(
                                            user => {
                                                history.goBack();
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
                                            <label htmlFor="text">Username</label>
                                            <Field
                                                name="username"
                                                className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}
                                            />
                                            <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                                        </div>
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
                                            <ThemedButton type="submit" className="btn btn-primary"
                                                          disabled={isSubmitting}>Sign Up</ThemedButton>
                                            {isSubmitting && <CircularProgress size={24}/>}
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
