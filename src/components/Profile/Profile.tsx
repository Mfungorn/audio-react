import * as React from 'react';
import {useContext, useLayoutEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {Action, AudioContext} from "../../context/AudioContext";
import {User} from "../../context/AuthContext";
import {authHeader} from "../../helpers";
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

    const {
        state, dispatch
    } = useContext(AudioContext);

    const options = {
        timeout: 15000,
        retries: 1,
        headers: {
            Authorization: authHeader().Authorization
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
            dispatch({
                type: Action.REQUEST_PROFILE,
                profile: value
            })
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
                    <h4>{state.profile ? state.profile.name : "No name"}</h4>
                    <h6>{state.profile ? state.profile.email : "No email"}</h6>
                </Box>
            </Box>}
        </div>
    );
};