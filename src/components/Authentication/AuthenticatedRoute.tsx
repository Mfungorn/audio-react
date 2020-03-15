import * as React from 'react'
import {useEffect, useState} from 'react'
import {Redirect, Route, useHistory} from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";


export default ({render, ...routeProps}) => {
    const {authenticated} = useAuth();
    const [isAuthenticated] = useState(authenticated);
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated) {

        } else {
            history.replace('/login', null)
        }
    });

    return (
        <Route
            {...routeProps}
            render={() => (isAuthenticated
                ? render()
                : <Redirect to="/login"/>)
            }
        />
    );
};
