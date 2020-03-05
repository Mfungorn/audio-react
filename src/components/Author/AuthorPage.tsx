import * as React from 'react';
import {useContext, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {Action, AudioContext, Author} from "../../context/AudioContext";
import {authHeader} from "../../helpers";
import useFetch from "use-http/dist";
import config from "../../config";


export interface AuthorPageProps {
    id: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}));

export const AuthorPage = (props: AuthorPageProps) => {
    const classes = useStyles();
    // let props = useParams<AuthorPageProps>();

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
    } = useFetch(`${config.apiUrl}/authors`, options);

    useEffect(() => {
        (async function fetchAuthor(id: string): Promise<Author> {
            return await request.get(`/${id}`);
        })(props.id).then(value => {
            console.log('author props', props);
            console.log('author page', value);
            dispatch({
                type: Action.REQUEST_AUTHOR,
                author: value
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
                    Author
                </Box>
                <Box flexGrow={1}>
                    <h4>{state.author ? state.author.name : "No name"}</h4>
                    <h6>{state.author ? state.author.bio : "No bio"}</h6>
                </Box>
            </Box>}
            {error && <h4>{error.message}</h4>}
        </div>
    );
};