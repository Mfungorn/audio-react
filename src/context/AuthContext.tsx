import * as React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
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
export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signIn = (email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        };

        return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
            .then(handleResponse)
            .then(response => {
                setUser(response.user);
                return response.user;
            });
    };


    const signUp = (email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        };

        return fetch(`${config.apiUrl}/users/register`, requestOptions)
    };


    const signOut = () => {
        setUser(false);
    };


    useEffect(() => {
        console.log(user);
        if (user) {
            setUser(user);
            localStorage.setItem(USER, JSON.stringify(user));
        } else {
            setUser(false);
            localStorage.removeItem(TOKEN);
        }
    }, [user]);

    // Return the user object and auth methods
    return {
        user,
        signIn,
        signUp,
        signOut
    };
}