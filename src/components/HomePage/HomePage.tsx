import * as React from 'react';
import {useEffect, useState} from 'react';
import {Author} from '../../context/AudioContext'
import {authenticationService} from '../../services';
import {User} from "../Root";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AuthorList} from "../Author/AuthorList";

const authors: Array<Author> = [
    {id: "1", name: "Unnamed Author 1"},
    {id: "2", name: "Unnamed Author 2"},
    {id: "3", name: "Unnamed Author 3"},
    {id: "4", name: "Unnamed Author 4"},
    {id: "5", name: "Unnamed Author 5"}
];

const useStyles = makeStyles((theme: Theme) => createStyles({

}));

export const HomePage = () => {
    // const {
    //     state,
    //     dispatch,
    //     // loading,
    //     // error,
    //     // data,
    //     // // и полученные данные используешь тут
    // } = useContext(AudioContext)

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
            <AuthorList authors={authors}/>
        </div>
    );
};
