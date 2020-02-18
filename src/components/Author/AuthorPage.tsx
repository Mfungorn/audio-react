import * as React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Box, Card, createStyles, Theme, Typography} from "@material-ui/core";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Author} from "../../context/AudioContext";


export interface AuthorPageProps {
    id: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }));
const onDidGetAuthor = () => {
    setTimeout(() => {

    }, 1000)
};

export const AuthorPage = () => {
    const classes = useStyles();
    let props = useParams<AuthorPageProps>();
    console.log(props);
    const [author, setAuthor] = useState<Author | null>({ id: props.id, name: "Unnamed" });

    return(
        <div style={{ width: '100%' }}>
            <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                <Box p={1} bgcolor="grey.300">
                    Author
                </Box>
                <Box flexGrow={1}>
                    <h4>{author.name}</h4>
                    <h6>item descr</h6>
                </Box>
            </Box>
        </div>
    );
};