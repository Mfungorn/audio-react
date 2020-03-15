import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {Author} from "../../context/AudioContext";
import useFetch from "use-http/dist";
import config from "../../config";
import {useAuth} from "../../context/AuthContext";


export interface AuthorPageProps {
    id: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}));

export const AuthorPage = (props: AuthorPageProps) => {
    const classes = useStyles();
    console.log("author page");

    // const {
    //     state, dispatch
    // } = useContext(AudioContext);

    const {token} = useAuth();
    const [author, setAuthor] = useState<Author>();

    const options = {
        timeout: 15000,
        retries: 1,
        headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`
        }
    };

    const {
        request, loading, error
    } = useFetch(`${config.apiUrl}/authors`, options);

    useEffect(() => {
        (async (id: string): Promise<Author> => await request.get(`/${id}`))(props.id)
            .then(value => {
                console.log('author page author', value);
                setAuthor(value)
            })
            .catch(error => {
                console.log('error', error);
            })
    });

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
                    <h4>{author ? author.name : "No name"}</h4>
                    <h6>{author ? author.bio : "No bio"}</h6>
                </Box>
            </Box>}
            {error && <h4>{error.message}</h4>}
        </div>
    );
};
