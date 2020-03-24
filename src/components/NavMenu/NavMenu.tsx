import React from "react";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import {useApi} from "../Authorization/ApiContext";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavMenu = () => {
    const classes = useStyles();
    const auth = useApi();
    const userSession = auth.userSession;

    const loginLogoutSection = () => {
        return userSession != null ? (
            <Box>
                <span>Logged in as: {userSession.email}</span>
                <Button color="inherit">Logout</Button>
            </Box>
        ) : (
            <Button color="inherit">Login</Button>
        )
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Audio
                </Typography>
                {loginLogoutSection()}
            </Toolbar>
        </AppBar>
    )
};

export default NavMenu;
