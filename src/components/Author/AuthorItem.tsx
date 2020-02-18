import * as React from 'react';
import {useCallback, useContext} from 'react';
import {Avatar, Box, createStyles, Theme, Typography} from "@material-ui/core";
import {Face} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";
import {AudioContext, Author} from "../../context/AudioContext";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
        },
    }));

export const AuthorItem = (initialAuthor: Author) => {
    const classes = useStyles();

    const {
        state,
        dispatch,
        author
    } = useContext(AudioContext);

    let history = useHistory();
    const getAuthor = useCallback((id: string) => {
        console.log(`/authors/${id}`);
        history.push(`/authors/${id}`)
    }, [history]);

    return (
        <div>
            <Box display="flex" justifyContent="flex-center" onClick={(e) => {
                console.log("click");
                getAuthor(author.id)
            }}>
                <Avatar className={classes.large}>
                    <Face/>
                </Avatar>
            </Box>
            <Typography variant="h5" component="h5">
                {author.name}
            </Typography>
        </div>
    );
};