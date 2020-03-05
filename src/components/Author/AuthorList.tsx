import * as React from 'react';
import {useCallback, useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {AuthorItem} from "./AuthorItem";
import {Author} from "../../context/AudioContext";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useHistory} from "react-router";


export type AuthorListProps = {
    authors: Author[]
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    flexContainer: {
        // flexGrow: 1,
        // display: 'grid',
        gridTemplateColumns: 'repeat(4,auto)',
        gridGap: theme.spacing(3),
        justifyContent: 'center'
    }
}));

export const AuthorList = (props: AuthorListProps) => {
    console.log('author list items', props);

    const classes = useStyles();

    const history = useHistory();

    const [visibleAuthorsCount, setVisibleAuthorsCount] = useState<number>(4);
    const expandAuthorsList = useCallback(() => {
        visibleAuthorsCount === 4 ? (
            setVisibleAuthorsCount(props.authors.length)
        ) : (
            setVisibleAuthorsCount(4)
        )
    }, [props.authors, visibleAuthorsCount, setVisibleAuthorsCount]);

    return (
        <div>
            <Grid container className={classes.flexContainer}>
                {props.authors.slice(0, visibleAuthorsCount).map(author => (
                    <Grid item xs={2}>
                        <AuthorItem
                            key={author.id}
                            author={author}
                        />
                    </Grid>
                ))}
                <Grid item container style={{
                    flexDirection: "column",
                    justifyContent: "bottom"
                }}>
                    <Button
                        style={{
                            height: 40,
                            width: '100%'
                        }}
                        onClick={expandAuthorsList}>
                        {visibleAuthorsCount === 4 ? (
                            <span>Show more</span>
                        ) : (
                            <span>Show less</span>
                        )}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};