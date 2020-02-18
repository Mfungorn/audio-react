import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {AudioContext, Author} from '../../context/AudioContext'
import {authenticationService} from '../../services';
import {User} from "../Root";
import {List} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AuthorItem} from "../Author/AuthorItem";

const authors: Array<Author> = [
    {id: "1", name: "Unnamed Author 1"}, {id: "2", name: "Unnamed Author 2"}
];

const useStyles = makeStyles((theme: Theme) => createStyles({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    }
}));

export const HomePage = () => {
    const {
        state,
        dispatch,
        // loading,
        // error,
        // data,
        // // и полученные данные используешь тут
    } = useContext(AudioContext)

    // // При необходимости чтото изменить в стейте, вызываешь экшен и прокидываешь в него необходимые данные
    // dispatch({
    //     type: 'GET_AUTHORS',
    //     author: 'author data',
    // })


    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState<User | null>();
    useEffect(() => {
        setCurrentUser(authenticationService.currentUserValue)
    }, [currentUser]);

    return(
        <div>
            { /* А дальше используешь эти данные, например еслипришел автор то выводим его */ }
            {/*{ state.author && (
                <>
                    <p>
                        <strong>ID</strong>
                        <span>{state.author.id}</span>
                    </p>
                    <p>
                        <strong>Author</strong>
                        <span>{state.author.name}</span>
                    </p>
                </>
            )}*/}

            <List className={classes.flexContainer}>
                {authors.map(author => (
                    <AuthorItem key={author.id} id={author.id} name={author.name}/>
                ))}
            </List>
        </div>
    );
};
