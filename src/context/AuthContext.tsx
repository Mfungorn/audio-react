import * as React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import config from "../config/config";
import {handleResponse} from "../helpers";


export type User = {
    id: string,
    name: string,
    email: string,
    balance: number,
    phone: string
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
    const [authenticated, setAuthenticated] = useState<Boolean>(false);

    const signIn = (email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        };

        return fetch(`${config.apiUrl}/auth/login`, requestOptions)
            .then(handleResponse)
            .then(response => {
                setToken(response);
                localStorage.setItem(TOKEN, JSON.stringify(response));
                setAuthenticated(true);
                return response.accessToken;
            })
            .catch(error => {
                console.log('sign in error', error)
            });
    };

    const signUp = (name, email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        };

        return fetch(`${config.apiUrl}/auth/register/customer`, requestOptions)
    };

    const signOut = () => {
        setToken(null);
        setAuthenticated(false);
        localStorage.removeItem(TOKEN);
    };

    useEffect(() => {
        console.log('auth token', token);
        if (token) {
        } else {
            signOut()
        }
    }, []);

    return <AuthContext.Provider
        value={{
            authenticated,
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
