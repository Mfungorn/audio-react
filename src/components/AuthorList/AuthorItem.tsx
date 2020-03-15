import * as React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, createStyles, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Author} from "../../context/AudioContext";
import {useHistory} from "react-router";


export type AuthorItemProps = {
    author: Author
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 240,
            borderRadius: 0,
            boxShadow: 'none'
        },
        cardMedia: {
            textAlign: 'center',
            width: 150,
            height: 150,
            margin: '0 auto',
            borderRadius: '50%',
        },
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
                style={{
                    paddingTop: 8
                }}
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
                    <Grid container justify="center" spacing={2} style={{
                        marginTop: 4,
                        marginBottom: 4
                    }}>
                        <FavoriteIcon/>
                        <Typography variant="body1" gutterBottom> • {props.author.rating}</Typography>
                    </Grid>
                    <Typography variant="body2" color="textSecondary" component="p"
                                style={{paddingLeft: 20, paddingRight: 20}}>
                        {props.author.bio}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};