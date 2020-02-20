import * as React from 'react';
import {useCallback, useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {AuthorItem} from "./AuthorItem";
import {Author} from "../../context/AudioContext";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => createStyles({
    flexContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,auto)',
        gridGap: theme.spacing(3),
        justifyContent: 'center',
        paddingLeft: '1%',
        paddingRight: '1%'
    }
}));

export const AuthorList = (items: { authors: Author[] }) => {
    const classes = useStyles();

    const [visibleAuthorsCount, setVisibleAuthorsCount] = useState<number>(4);
    const expandAuthorsList = useCallback(() => {
        visibleAuthorsCount === 4 ? (
            setVisibleAuthorsCount(items.authors.length)
        ) : (
            setVisibleAuthorsCount(4)
        )
    }, [items.authors, visibleAuthorsCount, setVisibleAuthorsCount]);

    return (
        <div style={{paddingTop: '3%'}}>
            <Grid container className={classes.flexContainer}>
                {items.authors.slice(0, visibleAuthorsCount).map(author => (
                    <Grid item>
                        <AuthorItem
                            key={author.id}
                            author={author}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button
                style={{float: 'right', marginRight: '13%'}}
                onClick={expandAuthorsList}>
                {visibleAuthorsCount === 4 ? (
                    <span>Show more</span>
                ) : (
                    <span>Show less</span>
                )}
            </Button>
        </div>
    );
};