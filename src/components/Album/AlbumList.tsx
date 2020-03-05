import * as React from 'react';
import {useCallback, useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {Album} from "../../context/AudioContext";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import AlbumItem from "./AlbumItem";
import {RouteComponentProps, withRouter} from "react-router";


export type AlbumListProps = {
    albums: Album[]
}

type PathParamsType = {
    param1: string,
}
// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & AlbumListProps

const useStyles = makeStyles((theme: Theme) => createStyles({
    flexContainer: {
        // flexGrow: 1,
        // display: 'grid',
        gridTemplateColumns: 'repeat(4,auto)',
        gridGap: theme.spacing(3),
        justifyContent: 'center'
    }
}));

const AlbumList = (props: PropsType) => {
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
            </Grid>
            <Button
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

export default withRouter(AlbumList)