import * as React from 'react';
import {Avatar, Card, CardActionArea, CardContent, CardMedia, createStyles, Theme, Typography} from "@material-ui/core";
import {Face} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";
import {Author} from "../../context/AudioContext";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 240,
            borderRadius: 0,
            boxShadow: 'none'
        },
        large: {
            width: 150,
            height: 150,
            margin: '0 auto'
        },
    }));

export const AuthorItem = (initialAuthor: Author) => {
    const classes = useStyles();

    // const {
    //     state,
    //     dispatch,
    //     response,
    //     error,
    //     isLoading
    // } = useContext(AudioContext);
    //
    // let history = useHistory();
    // const onAuthorClick = (id: string) => {
    //     dispatch({
    //         type: Action.GET_AUTHOR,
    //         authorId: id
    //     })
    // };

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia style={{
                    textAlign: 'center'
                }}>
                    <Avatar className={classes.large}>
                        <Face/>
                    </Avatar>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'center'}}>
                        {initialAuthor.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p"
                                style={{paddingLeft: 20, paddingRight: 20}}>
                        wewer werwrwerwe rwerwerw erwerwer werwerwe werwrwe
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};