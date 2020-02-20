import * as React from 'react';
import {useCallback, useContext, useEffect} from 'react';
import {Action, AudioContext, Author} from '../../context/AudioContext'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AuthorList} from "../Author/AuthorList";
import useFetch from "use-http/dist";
import {CircularProgress} from "@material-ui/core";
import config from "../../config";


const useStyles = makeStyles((theme: Theme) => createStyles({}));

export const HomePage = () => {

    // // При необходимости что-то изменить в стейте, вызываешь экшен и прокидываешь в него необходимые данные
    // dispatch({
    //     type: 'GET_AUTHORS',
    //     author: 'author data',
    // })

    const classes = useStyles();
    const {
        state, dispatch,
        response, error, loading
    } = useContext(AudioContext);

    const options = {
        timeout: 15000,
        retries: 1
    };

    const [req, res] = useFetch(config.apiUrl, options);

    const fetchAuthors = useCallback(() => {
        dispatch({
            type: Action.LOADING,
        });

        async function fetchAuthors(): Promise<Array<Author>> {
            return await req.get(`/authors`);
        }

        return fetchAuthors()
    }, [req, dispatch]);

    useEffect(() => {
        fetchAuthors()
            .then(value => {
                dispatch({
                    type: Action.REQUEST_AUTHORS,
                    authors: value
                })
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Action.ERROR,
                    error: error
                })
            })
    }, [dispatch, fetchAuthors]);

    return(
        <div>
            { /* А дальше используешь эти данные, например если пришел автор то выводим его */}
            {state.authors && <AuthorList authors={state.authors}/>}
            {loading &&
            <div style={{width: '100%', height: '100%'}}>
                <CircularProgress style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto'
                }} size={24}/>
            </div>
            }
            {error && <h4>{error.message}</h4>}
        </div>
    );
};
