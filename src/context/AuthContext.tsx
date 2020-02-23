import * as React from 'react';
import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import config from "../config/config";
import {handleResponse} from "../helpers";


export type User = {
    username: string,
    email: string
}
export const TOKEN = 'token';
export type Token = {
    accessToken: string,
    tokenType: string
}

export const AuthContext = createContext(null);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth = (props) => {
    const [token, setToken] = useState<Token>(null);

    let signIn = useCallback((email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        };

        return fetch(`${config.apiUrl}/auth/login`, requestOptions)
            .then(handleResponse)
            .then(response => {
                setToken(response);
                return response.accessToken;
            })
            .catch(error => {
                console.log('sign in error', error)
            });
    }, []);

    let signUp = useCallback((name, email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        };

        return fetch(`${config.apiUrl}/auth/register/customer`, requestOptions)
    }, []);


    const signOut = useCallback(() => {
        setToken(null);
    }, []);


    useEffect(() => {
        console.log('auth token', token);
        if (token) {
            setToken(token);
            localStorage.setItem(TOKEN, JSON.stringify(token));
        } else {
            setToken(null);
            localStorage.removeItem(TOKEN);
        }
    }, [token]);

    return <AuthContext.Provider
        value={{
            token,
            signIn,
            signUp,
            signOut
        }}
        {...props} />
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(AuthContext);