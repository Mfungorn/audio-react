import * as React from 'react';
import { authenticationService, userService } from '../../services';
import {User} from "../Root";
import {useEffect, useState} from "react";
import {List, ListItem} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Author} from "../Author/AuthorPage";
import {AuthorItem} from "../Author/AuthorItem";


const authors: Array<Author> = [
    { id: "1", name: "Unnamed Author 1" }, { id: "2", name: "Unnamed Author 2" }
];

const useStyles = makeStyles((theme: Theme) => createStyles({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    }
}));

export const HomePage = () => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState<User | null>();
    useEffect(() => {
        setCurrentUser(authenticationService.currentUserValue)
    }, [currentUser]);

    return(
        <div>
            <List className={classes.flexContainer}>
                {authors.map(author => (
                    <AuthorItem key={author.id} id={author.id} name={author.name}/>
                ))}
            </List>
        </div>
    );
};