import React, {useEffect, useState} from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    ClickAwayListener,
    Grow,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Slide,
    Toolbar,
    Typography,
    useScrollTrigger
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonIcon from '@material-ui/icons/Person';
import {makeStyles} from "@material-ui/core/styles";
import {useApi} from "../../api/ApiContext";
import {useHistory, useLocation} from "react-router-dom";
import {Routes} from "../../Routes";

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

interface HideOnScrollProps {
    children?: React.ReactNode;
}

const HideOnScroll = (props: HideOnScrollProps) => {
    const {children} = props;

    const trigger = useScrollTrigger({target: window});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

const NavMenu = () => {
    const classes = useStyles();

    const auth = useApi();
    const userSession = auth.userSession;

    const history = useHistory();

    const [locations, setLocations] = useState([useLocation()]);

    const [title, setTitle] = useState<String>("Audio");

    useEffect(() => {
        history.listen((location, action) => {
            if (action === 'REPLACE') {
                setLocations([]);
            }
            if (action === 'PUSH') {
                setLocations([...locations, location])
            }
            if (action === 'POP') {
                setLocations(locations.filter((value) => (
                    value !== location
                )))
            }
            switch (location.pathname) {
                case Routes.home:
                    setTitle("Audio");
                    break;
                case Routes.profile:
                    setTitle("Your profile");
                    break;
                default:
                    if (location.pathname.startsWith("/author")) {
                        setTitle("Performer")
                    } else if (location.pathname.startsWith("/album")) {
                        setTitle("Album")
                    } else
                        setTitle("Audio")
            }
        });
    }, []);

    const back = () => {
        history.goBack()
    };

    const [isMenuOpened, setMenuOpened] = useState<boolean>(false);

    const handleMenuStateChange = () => {
        setMenuOpened(!isMenuOpened)
    };

    const handleProfileClick = () => {
        history.push(Routes.profile)
    }

    const loginLogoutSection = () => {
        return userSession != null ? (
            <Box>
                <IconButton color="inherit" aria-label="add an alarm" onClick={handleProfileClick}>
                    <Avatar>{userSession.email.charAt(0)}</Avatar>
                </IconButton>
                <Button color="inherit">Logout</Button>
            </Box>
        ) : (
            <Button color="inherit">Login</Button>
        )
    };

    const menuPopperSection = () => {
        return <Popper transition disablePortal open={isMenuOpened}>{({TransitionProps}) => (
            <Grow {...TransitionProps} style={{transformOrigin: 'center top'}}>
                <Paper><ClickAwayListener onClickAway={handleMenuStateChange}>
                    <MenuList>
                        <MenuItem onClick={(e) => {
                            handleMenuStateChange()
                            handleProfileClick()
                        }}>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText inset primary="Profile"/>
                        </MenuItem>
                    </MenuList>
                </ClickAwayListener></Paper>
            </Grow>
        )}</Popper>
    };

    return (
        <HideOnScroll>
            <AppBar color="default">
                <Toolbar>
                    {locations.length > 1
                        ? <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="back"
                                      onClick={back}>
                            <ArrowBackIcon/>
                        </IconButton>
                        : <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu"
                                      onClick={handleMenuStateChange}>
                            <MenuIcon/>
                        </IconButton>}
                    <Typography variant="h6" className={classes.title}>{title}</Typography>
                    {menuPopperSection()}
                    {loginLogoutSection()}
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
};

export default NavMenu;
