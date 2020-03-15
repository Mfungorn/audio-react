import * as React from 'react';
import {useLayoutEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {useAuth, User} from "../../context/AuthContext";
import useFetch from "use-http/dist";
import config from "../../config";


export interface ProfileProps {
    id: string,
    name: string,
    email: string,
    balance: number,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}));

export const Profile = () => {
    const classes = useStyles();

    // const {
    //     state, dispatch
    // } = useContext(AudioContext);

    const {token} = useAuth();
    const [user, setUser] = useState<User>();

    const options = {
        timeout: 15000,
        retries: 1,
        headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`
        }
    };

    const {
        request, loading, error
    } = useFetch(`${config.apiUrl}/user/profile`, options);

    useLayoutEffect(() => {
        (async function fetchProfile(): Promise<User> {
            return await request.get();
        })().then(value => {
            console.log("profile", value);
            setUser(value)
        }).catch(error => {
            console.log('error', error);
        })
    }, []);

    return (
        <div style={{width: '100%', height: '100%'}}>
            {loading && <CircularProgress style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto'
            }} size={24}/>}
            {!loading && <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                <Box p={1} bgcolor="grey.300">
                    Profile
                </Box>
                <Box flexGrow={1}>
                    <h4>{user ? user.name : "No name"}</h4>
                    <h6>{user ? user.email : "No email"}</h6>
                </Box>
            </Box>}
        </div>
    );
};
