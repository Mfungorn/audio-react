import * as React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, createStyles, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useHistory} from "react-router";
import {Author} from "../../../domain/models/Author";


export type AuthorItemProps = {
    author: Author
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 0,
            boxShadow: 'none'
        },
        cardAction: {
            minHeight: 400,
            paddingTop: 8
        },
        cardMedia: {
            textAlign: 'center',
            width: 150,
            height: 150,
            margin: '0 auto',
            borderRadius: '50%',
        },
        favorites: {
            marginTop: 4,
            marginBottom: 4
        },
        bio: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        }
    }));

export const AuthorItem = (props: AuthorItemProps) => {
    const classes = useStyles();
    const history = useHistory();

    const onAuthorClick = (id: string) => {
        console.log("author item", id);
        history.push(`/authors/${id}`);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea
                className={classes.cardAction}
                onClick={e => onAuthorClick(props.author.id)}
            >
                <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={props.author.logo}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'center'}}>
                        {props.author.name}
                    </Typography>
                    <Grid container justify="center" spacing={2} className={classes.favorites}>
                        <FavoriteIcon />
                        <Typography variant="subtitle1" gutterBottom> • {props.author.rating}</Typography>
                    </Grid>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.bio}>
                        {props.author.bio}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
