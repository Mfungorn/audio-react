import * as React from 'react';
import {useEffect, useState} from 'react';
import {useAuth} from "../context/AuthContext";
import {useHistory} from "react-router";

export const Authorize = props => {
    const [isAuthorized, setAuthorized] = useState(false);
    const {user} = useAuth();
    console.log('authorize user', user);

    let history = useHistory();

    useEffect(() => {
        if (user) {
            setAuthorized(true);
            console.log('set authorized', true);
        } else {
            setAuthorized(false);
            console.log('set authorized', false);
            history.replace('/login', null)
        }
    }, [user]);

    return <>{isAuthorized ? props.children : null}</>
};