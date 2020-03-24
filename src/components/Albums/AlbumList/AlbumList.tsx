import * as React from 'react';
import {useCallback, useState} from 'react';
import {Button, Grid, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useHistory} from "react-router";
import {Album} from "../../../domain/models/Album";
import {AlbumItem} from "./AlbumItem";


export type AlbumListProps = {
    albums: Album[]
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    flexContainer: {
        flexGrow: 1,
        marginTop: theme.spacing(1),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    },
    flexItem: {
        padding: theme.spacing(0),
    },
    showMore: {
        height: theme.spacing(6),
        width: theme.spacing(18),
        marginBottom: theme.spacing(4),
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: theme.spacing(3)
    }
}));

export const AlbumList = (props: AlbumListProps) => {
    console.log('album list items', props.albums);

    const classes = useStyles();

    const history = useHistory();

    const [visibleAlbumsCount, setVisibleAlbumsCount] = useState<number>(4);
    const expandAlbumsList = useCallback(() => {
        visibleAlbumsCount === 4 ? (
            setVisibleAlbumsCount(props.albums.length)
        ) : (
            setVisibleAlbumsCount(4)
        )
    }, [props.albums, visibleAlbumsCount, setVisibleAlbumsCount]);

    return (
        <Grid container className={classes.flexContainer} spacing={2}>
            <Grid item container justify="flex-start">
                <Typography variant="h4">
                    Popular albums
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid direction="row" container justify="flex-start" spacing={2}>
                    {props.albums.slice(0, visibleAlbumsCount).map(album => (
                        <Grid item xs={3}>
                            <AlbumItem
                                key={album.id}
                                album={album}
                            />
                        </Grid>
                    ))}
                    {(props.albums.length > 4) && <Grid item container direction="column" justify="center">
                        <Button
                            className={classes.showMore}
                            onClick={expandAlbumsList}>
                            {visibleAlbumsCount === 4 ? (
                                <span>Show more</span>
                            ) : (
                                <span>Show less</span>
                            )}
                        </Button>
                    </Grid>}
                </Grid>
            </Grid>
        </Grid>
    );
};
