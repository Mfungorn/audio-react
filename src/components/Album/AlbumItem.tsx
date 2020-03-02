import * as React from 'react';
import {useCallback} from 'react';
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
import {Album} from "../../context/AudioContext";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";


export type AlbumItemProps = {
    album: Album
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 200,
        },
        cardMedia: {
            textAlign: 'center',
            width: 200,
            height: 200,
            margin: '0 auto',
        },
    }));

export const AlbumItem = (props: AlbumItemProps) => {
    const classes = useStyles();

    let history = useHistory();
    const onAuthorClick = useCallback((id: string) => {
        // console.log(id);
        // history.push(`/${id}`)
    }, [history]);

    return (
        <Card className={classes.root}>
            <CardActionArea
                onClick={e => onAuthorClick(props.album.id)}>
                <NavLink to={`/albums/${props.album.id}`}>
                    {props.album.cover ? <CardMedia
                        component="img"
                        className={classes.cardMedia}
                        image={props.album.cover}
                    /> : <AlbumIcon style={{
                        fontSize: 200,
                        textAlign: 'center',
                        margin: '0 auto',
                    }}/>}
                </NavLink>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6" style={{textAlign: 'start'}}>
                        {props.album.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Typography gutterBottom variant="body2" component="h6" style={{textAlign: 'end'}}>
                        {/*TODO*/}
                        {props.album.genres.pop()}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};