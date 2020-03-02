import * as React from 'react';
import {useCallback, useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {Album} from "../../context/AudioContext";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AlbumItem} from "./AlbumItem";


export type AlbumListProps = {
    albums: Album[]
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    flexContainer: {
        flexGrow: 1,
        gridGap: theme.spacing(3),
        justifyContent: 'start',
        paddingLeft: '1%',
        paddingRight: '1%'
    }
}));

export const AlbumList = (props: AlbumListProps) => {
    console.log('album list items', props);

    const classes = useStyles();

    const [visibleAlbumsCount, setVisibleAlbumsCount] = useState<number>(4);
    const expandAlbumsList = useCallback(() => {
        visibleAlbumsCount === 4 ? (
            setVisibleAlbumsCount(props.albums.length)
        ) : (
            setVisibleAlbumsCount(4)
        )
    }, [props.albums, visibleAlbumsCount, setVisibleAlbumsCount]);

    return (
        <div style={{paddingTop: '3%'}}>
            <Grid container className={classes.flexContainer}>
                {props.albums.slice(0, visibleAlbumsCount).map(album => (
                    <Grid item xs={2}>
                        <AlbumItem
                            key={album.id}
                            album={album}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button
                style={{float: 'right', marginRight: '13%'}}
                onClick={expandAlbumsList}>
                {visibleAlbumsCount === 4 ? (
                    <span>Show more</span>
                ) : (
                    <span>Show less</span>
                )}
            </Button>
        </div>
    );
};