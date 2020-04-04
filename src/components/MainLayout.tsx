import React from "react";
import {Box, Container, Fab, useScrollTrigger, Zoom} from "@material-ui/core";
import NavMenu from "./NavMenu/NavMenu";
import {makeStyles} from "@material-ui/core/styles";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
    container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    }
}));

interface ScrollTopProps {
    children: React.ReactElement;
}

function ScrollTop(props: ScrollTopProps) {
    const classes = useStyles();

    const {children} = props;

    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            '#authors-title',
        );

        console.log(anchor);

        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

const MainLayout: React.FC = props => {
    const classes = useStyles();

    return (
        <Box>
            <NavMenu/>
            <Container className={classes.container}>
                {props.children}
            </Container>
            <ScrollTop {...props}>
                <Fab color="secondary" size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </Box>
    )
};

export default MainLayout;
