import * as React from 'react';
import {useCallback, useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {Album} from "../../context/AudioContext";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AlbumItem} from "./AlbumItem";
import {useHistory} from "react-router";


export type AlbumListProps = {
    albums: Album[]
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    flexContainer: {
        // flexGrow: 1,
        // display: 'grid',
        gridTemplateColumns: 'repeat(4,auto)',
        gridGap: theme.spacing(3),
        justifyContent: 'center'
    }
}));

export const AlbumList = (props: AlbumListProps) => {
    console.log('album list items', props);

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
        <div>
            <Grid container className={classes.flexContainer}>
                {props.albums.slice(0, visibleAlbumsCount).map(album => (
                    <Grid item xs={2}>
                        <AlbumItem
                            key={album.id}
                            album={album}
                        />
                    </Grid>
                ))}
                <Grid item container style={{
                    flexDirection: "column",
                    justifyContent: "bottom"
                }}>
                    <Button
                        style={{
                            height: 40,
                            width: '100%'
                        }}
                        onClick={expandAlbumsList}>
                        {visibleAlbumsCount === 4 ? (
                            <span>Show more</span>
                        ) : (
                            <span>Show less</span>
                        )}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};