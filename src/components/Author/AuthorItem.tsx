import * as React from 'react';
import {useCallback} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, createStyles, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Author} from "../../context/AudioContext";
import {RouteComponentProps, withRouter} from "react-router";


export type AuthorItemProps = {
    author: Author
}
type PathParamsType = {
    param1: string,
}
// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & AuthorItemProps

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

const AuthorItem = (props: PropsType) => {
    const classes = useStyles();

    const onAuthorClick = useCallback((id: string) => {
        // console.log(id);
        // history.push(`/authors/${id}`)
        props.history.push(`/authors/${id}`);
    }, []);

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

export default withRouter(AuthorItem)