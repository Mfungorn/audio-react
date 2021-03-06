import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    CircularProgress,
    createStyles,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Theme,
    Typography
} from "@material-ui/core";
import {useApi} from "../../api/ApiContext";
import {AxiosResponse} from 'axios';
import {toast} from "react-toastify";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FaceIcon from '@material-ui/icons/Face';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Profile} from "../../domain/models/Profile";
import {formatDuration} from "../../helpers/timeDurationFormatter";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            flexGrow: 1,
            marginTop: theme.spacing(2),
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8)
        },
        content: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        field: {
            paddingTop: theme.spacing(1),
        },
        balanceField: {
            display: 'inline',
        },
        addBalanceIcon: {
            height: 16,
            width: 16,
        },
        addBalanceButton: {
            paddingTop: 0,
            paddingLeft: 4,
            paddingBottom: 2,
            paddingRight: 0
        },
        trackItem: {
            borderRadius: theme.spacing(4)
        },
        profileIcon: {
            width: '100%',
            fontSize: 128,
            textAlign: 'center',
            margin: '0 auto',
        },
        noTracks: {
            paddingTop: theme.spacing(4),
            borderBottomLeftRadius: theme.spacing(1),
            borderBottomRightRadius: theme.spacing(1)
        },
    }));

export const ProfilePage = () => {
    const classes = useStyles();

    const api = useApi();

    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        (async (): Promise<AxiosResponse<Profile>> => await api.fetchProfile())()
            .then(response => {
                console.log('profile page profile', response.data);
                setProfile(response.data)
            })
            .catch(error => {
                toast.error(`Error loading profile: ${error}`);
                console.log('error', error);
            });
    }, []);

    return (
        <Grid container className={classes.flexContainer}>
            <Grid item xs={12}>
                <Paper>
                    <Grid direction="row" container alignItems="center" spacing={2}>
                        <Grid item xs={2}>
                            <FaceIcon className={classes.profileIcon}/>
                        </Grid>
                        <Grid item justify="flex-start" alignItems="center">
                            <Grid className={classes.content}>
                                <Typography variant="h3">{profile?.name}</Typography>
                                <Divider/>
                                <Typography className={classes.field} variant="body2">{profile?.email}</Typography>
                                <Typography className={classes.balanceField} variant="body2" color="textSecondary">Your
                                    balance: {profile?.balance || 0}</Typography>
                                <IconButton className={classes.addBalanceButton}>
                                    <AddCircleIcon className={classes.addBalanceIcon}/>
                                </IconButton>
                                {profile?.phone &&
                                <Typography variant="body2" color="textSecondary">Phone
                                    number: {profile?.phone}</Typography>}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                            {profile?.favoriteCompositions?.length === 0 &&
                            <ListItem button className={classes.noTracks}>
                                <ListItemIcon>
                                    <FavoriteBorderIcon/>
                                </ListItemIcon>
                                <ListItemText primary="No favorite tracks"/>
                            </ListItem>}
                            {profile?.favoriteCompositions ? <List component="nav">
                                {profile?.favoriteCompositions?.map(track => (
                                    <ListItem button className={classes.trackItem}>
                                        <ListItemIcon>
                                            <FavoriteIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={track.title}/>
                                        <ListItemSecondaryAction>
                                            <Typography variant="body1">{formatDuration(track.duration)}</Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List> : <CircularProgress size={24}/>}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};
