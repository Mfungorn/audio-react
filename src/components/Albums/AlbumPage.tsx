import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    CircularProgress,
    createStyles,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Theme,
    Typography
} from "@material-ui/core";
import {Album} from "../../domain/models/Album";
import {useApi} from "../Authorization/ApiContext";
import {AxiosResponse} from 'axios';
import {toast} from "react-toastify";
import {Track} from "../../domain/models/Track";
import {MusicNoteOutlined} from "@material-ui/icons";
import AlbumIcon from "@material-ui/icons/Album";


export interface AlbumPageProps {
    id: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            flexGrow: 1,
            marginTop: theme.spacing(2),
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8)
        },
        coverContainer: {
            width: 256,
            height: 256,
            marginLeft: theme.spacing(1)
        },
        cover: {
            width: 256,
            height: 256,
            margin: '0 auto',
        },
        content: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        trackItem: {
            borderRadius: theme.spacing(4)
        },
        albumIcon: {
            width: '100%',
            fontSize: 256,
            textAlign: 'center',
            margin: '0 auto',
        },
        noTracks: {
            paddingTop: theme.spacing(4),
            borderBottomLeftRadius: theme.spacing(1),
            borderBottomRightRadius: theme.spacing(1)
        },
        albumExecutor: {
            paddingTop: theme.spacing(1)
        }
    }));

export const AlbumPage = (props: AlbumPageProps) => {
    const classes = useStyles();

    const api = useApi();

    const [album, setAlbum] = useState<Album>();
    const [albumTracks, setAlbumTracks] = useState<Track[]>([]);

    useEffect(() => {
        (async (id: number): Promise<AxiosResponse<Album>> => await api.fetchAlbum(id))(parseInt(props.id))
            .then(response => {
                console.log('album page album', response.data);
                setAlbum(response.data)
            })
            .catch(error => {
                toast.error(`Error receiving album: ${error}`);
                console.log('error', error);
            });

        (async (id: number): Promise<AxiosResponse<Track[]>> => await api.fetchAlbumTracks(id))(parseInt(props.id))
            .then(response => {
                console.log('album page tracks', response.data);
                setAlbumTracks(response.data)
            })
            .catch(error => {
                toast.error(`Error receiving album tracks: ${error}`);
                console.log('error', error);
            });
    }, []);

    return (
        <Grid container className={classes.flexContainer}>
            <Grid item xs={12}>
                <Paper>
                    <Grid direction="row" container alignItems="center" spacing={2}>
                        <Grid item>
                            {album?.cover ? <Paper className={classes.coverContainer} elevation={4}>
                                <img
                                    className={classes.cover}
                                    alt="Album's cover"
                                    src={album?.cover}
                                />
                            </Paper> : <AlbumIcon className={classes.albumIcon}/>}
                        </Grid>
                        <Grid item justify="flex-start" alignItems="center">
                            <Grid className={classes.content}>
                                <Typography variant="subtitle2">ALBUM</Typography>
                                <Typography variant="h2">{album?.title}</Typography>
                                <Typography variant="subtitle2">
                                    {album?.year || 'unknown'} • {album?.genre}
                                </Typography>

                                <Typography variant="subtitle2" className={classes.albumExecutor}>
                                    EXECUTOR: {album?.authorName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                            {albumTracks?.length === 0 && <ListItem button className={classes.noTracks}>
                                <ListItemIcon>
                                    <MusicNoteOutlined/>
                                </ListItemIcon>
                                <ListItemText primary="No tracks"/>
                            </ListItem>}
                            {albumTracks ? <List component="nav">
                                {albumTracks.map(track => (
                                    <ListItem button className={classes.trackItem}>
                                        <ListItemIcon>
                                            <MusicNoteOutlined/>
                                        </ListItemIcon>
                                        <ListItemText primary={track.title}/>
                                    </ListItem>
                                ))}
                            </List> : <CircularProgress size={24}/>}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};
