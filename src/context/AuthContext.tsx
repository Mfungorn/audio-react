import * as React from 'react';
import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import config from "../config/config";
import {handleResponse} from "../helpers";
import {TOKEN} from "../services";


export type User = {
    username: string,
    email: string
}
export const USER = 'user';

export const AuthContext = createContext(null);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth = (props) => {
    const [user, setUser] = useState(null);

    let signIn = useCallback((email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        };

        return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
            .then(handleResponse)
            .then(response => {
                setUser(response.token);
                return response.token;
            })
            .catch(error => {
                console.log('sign in error', error)
            });
    }, []);

    let signUp = useCallback((email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        };

        return fetch(`${config.apiUrl}/users/register`, requestOptions)
    }, []);


    const signOut = useCallback(() => {
        setUser(false);
    }, []);


    useEffect(() => {
        console.log('auth user', user);
        if (user) {
            setUser(user);
            localStorage.setItem(USER, JSON.stringify(user));
        } else {
            setUser(false);
            localStorage.removeItem(TOKEN);
        }
    }, [user]);

    return <AuthContext.Provider
        value={{
            user,
            signIn,
            signUp,
            signOut
        }}
        {...props} />
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(AuthContext);