import * as React from 'react';
import {useCallback} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, createStyles, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Author} from "../../context/AudioContext";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";


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

    let history = useHistory();
    const onAuthorClick = useCallback((id: string) => {
        // console.log(id);
        // history.push(`/${id}`)
    }, [history]);

    return (
        <NavLink to={`/authors/${props.author.id}`}>
            <Card className={classes.root}>
                <CardActionArea onClick={e => onAuthorClick(props.author.id)}>
                    <CardMedia
                        component="img"
                        className={classes.cardMedia}
                        image={props.author.logo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'center'}}>
                            {props.author.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p"
                                    style={{paddingLeft: 20, paddingRight: 20}}>
                            wewer werwrwerwe rwerwerw erwerwer werwerwe werwrwe
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </NavLink>
    );
};