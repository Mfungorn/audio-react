import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {Author} from "../../domain/models/Author";
import {useApi} from "../Authorization/ApiContext";
import {AxiosResponse} from 'axios';
import {toast} from "react-toastify";


export interface AuthorPageProps {
    id: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}));

export const AuthorPage = (props: AuthorPageProps) => {
    const classes = useStyles();

    const api = useApi();

    const [author, setAuthor] = useState<Author>();

    useEffect(() => {
        (async (id: number): Promise<AxiosResponse<Author>> => await api.fetchAuthor(id))(props.id)
            .then(response => {
                console.log('author page author', response.data);
                setAuthor(response.data)
            })
            .catch(error => {
                toast.error(`Error receiving author: ${error}`);
                console.log('error', error);
            })
    });

    return (
        <div style={{width: '100%', height: '100%'}}>
            {!author && <CircularProgress style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto'
            }} size={24}/>}
            {author && <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                <Box p={1} bgcolor="grey.300">
                    Author
                </Box>
                <Box flexGrow={1}>
                    <h4>{author ? author.name : "No name"}</h4>
                    <h6>{author ? author.bio : "No bio"}</h6>
                </Box>
            </Box>}
        </div>
    );
};
