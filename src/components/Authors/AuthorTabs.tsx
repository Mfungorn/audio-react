import * as React from 'react';
import {useCallback, useState} from 'react';
import {
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {Track} from "../../domain/models/Track";
import {Album} from "../../domain/models/Album";
import {MusicNoteOutlined} from "@material-ui/icons";
import {AlbumItem} from "../Albums/AlbumList/AlbumItem";
import {formatDuration} from "../../helpers/timeDurationFormatter";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    trackItem: {
        borderRadius: theme.spacing(4)
    },
    showMore: {
        height: theme.spacing(6),
        width: theme.spacing(18),
        marginBottom: theme.spacing(4),
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: theme.spacing(3)
    }
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

interface AuthorTabsProps {
    tracks: Track[];
    albums: Album[];
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const AuthorTabs = (props: AuthorTabsProps) => {
    const {tracks, albums} = props;

    const classes = useStyles();

    const [value, setValue] = useState<any>(0);
    const [visibleAlbumsCount, setVisibleAlbumsCount] = useState<number>(4);
    const expandAlbumsList = useCallback(() => {
        visibleAlbumsCount === 4 ? (
            setVisibleAlbumsCount(albums.length)
        ) : (
            setVisibleAlbumsCount(4)
        )
    }, [albums, visibleAlbumsCount, setVisibleAlbumsCount]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Tracks" {...a11yProps(0)}/>
                <Tab label="Albums" {...a11yProps(1)}/>
            </Tabs>
            <Divider/>
            <TabPanel value={value} index={0}>
                <List component="nav">
                    {tracks.map(track => (
                        <ListItem button className={classes.trackItem}>
                            <ListItemIcon>
                                <MusicNoteOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={track.title}/>
                            <ListItemSecondaryAction>
                                <Typography variant="body1">{formatDuration(track.duration)}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                    <Grid direction="row" container justify="flex-start" spacing={2}>
                        {albums.slice(0, visibleAlbumsCount).map(album => (
                            <Grid item xs={3}>
                                <AlbumItem
                                    key={album.id}
                                    album={album}
                                />
                            </Grid>
                        ))}
                        {(albums.length > 4) && <Grid item container direction="column" justify="center">
                            <Button
                                className={classes.showMore}
                                onClick={expandAlbumsList}>
                                {visibleAlbumsCount === 4 ? (
                                    <span>Show more</span>
                                ) : (
                                    <span>Show less</span>
                                )}
                            </Button>
                        </Grid>}
                    </Grid>
                </Grid>
            </TabPanel>
        </div>
    );
};
