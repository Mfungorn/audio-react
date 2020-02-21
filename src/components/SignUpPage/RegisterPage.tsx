import * as React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {RouteComponentProps, useHistory} from "react-router";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import {ThemedButton} from "../ThemedButton";
import {useAuth} from "../../context/AuthContext";


interface RouterProps {
    title: string;   // This one is coming from the router
}

interface Props extends RouteComponentProps<RouterProps> {
    // Add your regular properties here
}

export const RegisterPage = (props: Props) => {
    let history = useHistory();

    const {user, signUp} = useAuth();

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
                            Sign Up
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
                                    signUp(email, password)
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