import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from "../context/AuthContext";


export default ({component: Component, ...routeProps}) => {
    const [user] = useAuth();
    console.log(user);

    return (
        <Route {...routeProps} render={props => (
            user ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />
            )
        )}/>
    );
};