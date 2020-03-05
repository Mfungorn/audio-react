import * as React from 'react'
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from "../context/AuthContext";


export default ({render, ...routeProps}) => {
    const {authenticated} = useAuth();
    return (
        <Route
            {...routeProps}
            render={() => (authenticated
                ? render()
                : <Redirect to='/login'/>)
            }
        />
    );
};