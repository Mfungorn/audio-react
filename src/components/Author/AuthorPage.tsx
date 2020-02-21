import * as React from 'react';
import {useCallback, useContext, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {useParams} from "react-router";
import {Action, AudioContext, Author} from "../../context/AudioContext";
import useFetch from "use-http/dist";
import config from '../../config'
import {authHeader} from "../../helpers";


export interface AuthorPageProps {
    id: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}));

export const AuthorPage = () => {
    const classes = useStyles();
    let props = useParams<AuthorPageProps>();

    const {
        state, dispatch,
        response, error, loading
    } = useContext(AudioContext);

    const options = {
        timeout: 15000,
        retries: 1,
        headers: {
            Authorization: authHeader().Authorization
        }
    };

    const [req, res] = useFetch(`${config.apiUrl}/authors`, options);

    const fetchAuthor = useCallback((id: string) => {
        dispatch({
            type: Action.LOADING,
        });

        async function fetchAuthor(id: string): Promise<Author> {
            return await req.get(`/${id}`);
        }

        return fetchAuthor(id)
    }, [req, dispatch]);

    useEffect(() => {
        console.log('author props', props);
        fetchAuthor(props.id)
            .then(value => {
                dispatch({
                    type: Action.REQUEST_AUTHOR,
                    author: value
                })
            })
            .catch(error => {
                console.log('error', error);
                dispatch({
                    type: Action.ERROR,
                    error: error
                })
            })
    }, [props, dispatch, fetchAuthor]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            {loading && <CircularProgress style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto'
            }} size={24}/>}
            {state.author && <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                <Box p={1} bgcolor="grey.300">
                    Author
                </Box>
                <Box flexGrow={1}>
                    <h4>{state.author.name}</h4>
                    <h6>item descr</h6>
                </Box>
            </Box>}
            {error && <h4>{error.message}</h4>}
        </div>
    );
};