import * as React from 'react';
import {useContext, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {Action, Album, AudioContext} from "../../context/AudioContext";
import {authHeader} from "../../helpers";
import useFetch from "use-http/dist";
import config from "../../config";


export interface AlbumPageProps {
    id: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}));

export const AlbumPage = (props: AlbumPageProps) => {
    const classes = useStyles();
    // let props = useParams<AlbumPageProps>();

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
    } = useFetch(`${config.apiUrl}/albums`, options);

    useEffect(() => {
        (async function fetchAlbum(id: string): Promise<Album> {
            return await request.get(`/${id}`);
        })(props.id).then(value => {
            console.log('album props', props);
            console.log('album page', value);
            dispatch({
                type: Action.REQUEST_ALBUM,
                album: value
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
                    Album
                </Box>
                <Box flexGrow={1}>
                    <h4>{state.album ? state.album.title : "No title"}</h4>
                    <h6>{state.album ? state.album.rating : "No rating"}</h6>
                </Box>
            </Box>}
            {error && <h4>{error.message}</h4>}
        </div>
    );
};