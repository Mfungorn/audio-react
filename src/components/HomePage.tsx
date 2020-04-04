import React, {useEffect, useState} from "react";
import {Box, CircularProgress} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Author} from "../domain/models/Author";
import {Album} from "../domain/models/Album";
import {useApi} from "./Authorization/ApiContext";
import {AxiosResponse} from "axios";
import {AuthorList} from "./Authors/AuthorList/AuthorList";
import {AlbumList} from "./Albums/AlbumList/AlbumList";
import {toast} from "react-toastify";


const useStyles = makeStyles((theme: Theme) => createStyles({}));

const HomePage = () => {
    const api = useApi();

    const [authors, setAuthors] = useState<Author[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        (async (): Promise<AxiosResponse<Author[]>> => await api.fetchPopularAuthors())()
            .then(response => {
                console.log('home authors', response.data);
                setAuthors(response.data)
            })
            .catch(error => {
                toast.error(`Error receiving authors: ${error}`);
                console.log('error', error);
            });

        (async (): Promise<AxiosResponse<Album[]>> => await api.fetchPopularAlbums())()
            .then(response => {
                console.log('home albums', response.data);
                setAlbums(response.data)
            })
            .catch(error => {
                toast.error(`Error receiving albums: ${error}`);
                console.log('error', error);
            });
    }, []);

    return (
        <Box>
            {authors && <>
                <AuthorList authors={authors}/>
            </>}
            {albums && <>
                <AlbumList albums={albums}/>
            </>}
            {(!authors || !albums) && <div style={{width: '100%', height: '100%'}}>
                <CircularProgress size={24}/>
            </div>}
        </Box>
    )
};

export default HomePage;
