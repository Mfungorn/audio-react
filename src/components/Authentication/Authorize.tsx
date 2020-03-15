import * as React from 'react';
import {useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {useHistory} from "react-router";

// @ts-ignore
export const Authorize = props => {
    const [isAuthorized, setAuthorized] = useState(false);
    const {token} = useAuth();
    console.log('authorize user', token);

    let history = useHistory();

    useEffect(() => {
        if (token) {
            setAuthorized(true);
            console.log('set authorized', true);
        } else {
            setAuthorized(false);
            console.log('set authorized', false);
            history.replace('/login', null)
        }
    }, [token]);

    return <>{isAuthorized ? props.children : null}</>
};
