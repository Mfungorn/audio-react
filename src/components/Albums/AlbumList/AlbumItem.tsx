import * as React from 'react';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    createStyles,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AlbumIcon from '@material-ui/icons/Album';
import {useHistory} from "react-router";
import {Album} from "../../../domain/models/Album";


export type AlbumItemProps = {
    album: Album
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // maxWidth: 200,
        },
        cardMedia: {
            textAlign: 'center',
            width: '100%',
            height: 'auto',
            margin: '0 auto',
        },
        cardAction: {
        },
        cardIcon: {
            width: '100%',
            fontSize: 250,
            textAlign: 'center',
            margin: '0 auto',
        }
    }));

export const AlbumItem = (props: AlbumItemProps) => {
    const classes = useStyles();

    const history = useHistory();

    const onAlbumClick = (id: string) => {
        history.push(`/albums/${id}`);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea
                className={classes.cardAction}
                onClick={e => onAlbumClick(props.album.id)}
            >
                {props.album.cover ? <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={props.album.cover}
                /> : <AlbumIcon className={classes.cardIcon}/>}
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6" style={{textAlign: 'start'}}>
                        {props.album.title}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="h6" style={{textAlign: 'start'}}>
                        {props.album.authorName} • {props.album.year}
                    </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
