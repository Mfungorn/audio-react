import * as React from "react";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import MoreIcon from "@material-ui/icons/MoreVert";
import {AuthorList} from "../AuthorList/AuthorList";
import {CircularProgress, Container} from "@material-ui/core";
import {Album, Author} from "../../context/AudioContext";
import config from "../../config";
import useFetch from "use-http/dist";
import {AlbumList} from "../AlbumList/AlbumList";
import {useHistory} from "react-router";


interface HomeState {
    authors: Author[],
    albums: Album[]
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    grow: {
        flexGrow: 1,
    },
    listTitle: {
        marginTop: 20,
        marginLeft: 80,
        marginBottom: 20
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}),);

export const Home = () => {
    const classes = useStyles();
    const history = useHistory();

    // Get auth state and re-render anytime it changes
    const {signOut, token} = useAuth();

    // const {
    //     state, dispatch
    // } = useContext(AudioContext);

    const [authors, setAuthors] = useState<Author[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);

    const options = {
        timeout: 15000,
        retries: 1,
        headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`
        }
    };

    const {
        request, loading, error
    } = useFetch(`${config.apiUrl}`, options);

    useEffect(() => {
        (async (): Promise<Author[]> => await request.get("/authors/all"))()
            .then(value => {
                console.log('home authors', value);
                setAuthors(value)
            })
            .catch(error => {
                console.log('error', error);
            });

        (async (): Promise<Album[]> => await request.get("/albums/all"))()
            .then(value => {
                console.log('home albums', value);
                setAlbums(value)
            })
            .catch(error => {
                console.log('error', error);
            });
    }, []);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const openProfile = () => {
        history.push('/user/profile');
        handleMenuClose()
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={openProfile}>Profile</MenuItem>
            <MenuItem onClick={signOut}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            {!loading && <div className={classes.grow}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Audio
                        </Typography>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>}
            <Container>
                {!loading && <>
                    <h1 className={classes.listTitle}>Authors</h1>
                    <AuthorList authors={authors}/>
                </>}
                {!loading && <>
                    <h1 className={classes.listTitle}>Albums</h1>
                    <AlbumList albums={albums}/>
                </>}
                {loading && <div style={{width: '100%', height: '100%'}}>
                    <CircularProgress size={24}/>
                </div>}
            </Container>
        </>
    );
};
