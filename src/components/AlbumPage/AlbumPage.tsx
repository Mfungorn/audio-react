import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {Album} from "../../context/AudioContext";
import useFetch from "use-http/dist";
import config from "../../config";
import {useAuth} from "../../context/AuthContext";


export interface AlbumPageProps {
    id: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}));

export const AlbumPage = (props: AlbumPageProps) => {
    const classes = useStyles();

    // const {
    //     state, dispatch
    // } = useContext(AudioContext);

    const {token} = useAuth();
    const [album, setAlbum] = useState<Album>();

    const options = {
        timeout: 15000,
        retries: 1,
        headers: {
            Authorization: `${token?.tokenType} ${token?.accessToken}`
        }
    };

    const {
        request, loading, error
    } = useFetch(`${config.apiUrl}/albums`, options);

    useEffect(() => {
        (async (id: string): Promise<Album> => await request.get(`/${id}`))(props.id)
            .then(value => {
                console.log('album page album', value);
                setAlbum(value)
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
                    Album
                </Box>
                <Box flexGrow={1}>
                    <h4>{album ? album.title : "No title"}</h4>
                    <h6>{album ? album.rating : "No rating"}</h6>
                </Box>
            </Box>}
            {error && <h4>{error.message}</h4>}
        </div>
    );
};
