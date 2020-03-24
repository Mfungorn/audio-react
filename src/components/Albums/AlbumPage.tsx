import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, CircularProgress, createStyles, Theme} from "@material-ui/core";
import {Album} from "../../domain/models/Album";
import {useApi} from "../Authorization/ApiContext";
import {AxiosResponse} from 'axios';
import {toast} from "react-toastify";


export interface AlbumPageProps {
    id: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}));

export const AlbumPage = (props: AlbumPageProps) => {
    const classes = useStyles();

    const api = useApi();

    const [album, setAlbum] = useState<Album>();

    useEffect(() => {
        (async (id: number): Promise<AxiosResponse<Album>> => await api.fetchAlbum(id))(props.id)
            .then(response => {
                console.log('album page album', response.data);
                setAlbum(response.data)
            })
            .catch(error => {
                toast.error(`Error receiving album: ${error}`);
                console.log('error', error);
            })
    }, []);

    return (
        <div style={{width: '100%', height: '100%'}}>
            {!album && <CircularProgress style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto'
            }} size={24}/>}
            {album && <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                <Box p={1} bgcolor="grey.300">
                    Album
                </Box>
                <Box flexGrow={1}>
                    <h4>{album ? album.title : "No title"}</h4>
                    <h6>{album ? album.rating : "No rating"}</h6>
                </Box>
            </Box>}
        </div>
    );
};
