import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Chip, createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {Author} from "../../domain/models/Author";
import {useApi} from "../../api/ApiContext";
import {AxiosResponse} from 'axios';
import {toast} from "react-toastify";
import {AuthorTabs} from "./AuthorTabs";
import FavoriteIcon from "@material-ui/icons/Favorite";


export interface AuthorPageProps {
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
        profile: {
            width: 256,
            height: 256,
            marginLeft: theme.spacing(1)
        },
        profileAvatar: {
            width: 256,
            height: 256,
            margin: '0 auto',
        },
        content: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        nested: {
            padding: theme.spacing(2),
        },
        favorites: {
            marginLeft: 2,
            marginTop: 2,
            marginRight: 2,
            height: 16,
            width: 16
        },
        genres: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }));

export const AuthorPage = (props: AuthorPageProps) => {
    const classes = useStyles();

    const api = useApi();

    const [author, setAuthor] = useState<Author>();

    useEffect(() => {
        (async (id: number): Promise<AxiosResponse<Author>> => await api.fetchAuthor(id))(parseInt(props.id))
            .then(response => {
                console.log('author page author', response.data);

                let authorPayload = response.data;
                authorPayload.albums?.forEach(album => (
                    album.authorName = authorPayload.name
                ));
                setAuthor(authorPayload)
            })
            .catch(error => {
                toast.error(`Error receiving author: ${error}`);
                console.log('error', error);
            });
    }, []);

    return (
        <Grid container className={classes.flexContainer}>
            <Grid item xs={12}>
                <Paper>
                    <Grid direction="row" container alignItems="center" spacing={2}>
                        <Grid item>
                            <Paper className={classes.profile} elevation={4}>
                                <img
                                    className={classes.profileAvatar}
                                    alt="Author's logo"
                                    src={author?.logo}
                                />
                            </Paper>
                        </Grid>
                        <Grid item justify="flex-start" alignItems="center">
                            <Grid className={classes.content}>
                                <Typography variant="subtitle2">PERFORMER</Typography>
                                <Typography variant="h2">{author?.name}</Typography>
                                <Typography variant="subtitle2">Genres:</Typography>
                                <Grid container direction="row" className={classes.genres} spacing={1}>
                                    {author?.genres?.map(genre => (
                                        <Grid item>
                                            <Chip label={genre.name}/>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid container direction="row">
                                    <FavoriteIcon className={classes.favorites}/>
                                    <Typography variant="subtitle2"> • {author?.rating || 0}</Typography>
                                </Grid>
                            </Grid>
                            {/*<ListItem button onClick={handleClick}>*/}
                            {/*    <ListItemText primary="Biography"/>*/}
                            {/*    {open ? <ExpandLess/> : <ExpandMore/>}*/}
                            {/*</ListItem>*/}
                            {/*{open && <Divider/>}*/}
                            {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
                            {/*    <Typography variant="body2" className={classes.nested}>{author?.bio}</Typography>*/}
                            {/*</Collapse>*/}
                            {/*<Divider/>*/}
                        </Grid>
                        <Grid item xs={12}>
                            <AuthorTabs
                                tracks={author?.compositions || []}
                                albums={author?.albums || []}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};
