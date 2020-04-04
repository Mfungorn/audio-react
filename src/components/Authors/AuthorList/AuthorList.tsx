import * as React from 'react';
import {useCallback, useState} from 'react';
import {Button, Grid, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Author} from "../../../domain/models/Author";
import {AuthorItem} from "./AuthorItem";


export type AuthorListProps = {
    authors: Author[]
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    flexContainer: {
        flexGrow: 1,
        marginTop: theme.spacing(1),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    },
    flexItem: {
        padding: theme.spacing(0),
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

export const AuthorList = (props: AuthorListProps) => {
    console.log('author list items', props.authors);

    const classes = useStyles();

    const [visibleAuthorsCount, setVisibleAuthorsCount] = useState<number>(4);
    const expandAuthorsList = useCallback(() => {
        visibleAuthorsCount === 4 ? (
            setVisibleAuthorsCount(props.authors.length)
        ) : (
            setVisibleAuthorsCount(4)
        )
    }, [props.authors, visibleAuthorsCount, setVisibleAuthorsCount]);

    return (
        <Grid container className={classes.flexContainer} spacing={2}>
            <Grid item container justify="flex-start">
                <Typography variant="h4" id="authors-title">
                    Popular authors
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid direction="row" container justify="flex-start" spacing={2}>
                    {props.authors.slice(0, visibleAuthorsCount).map(author => (
                        <Grid item xs={3}>
                            <AuthorItem
                                key={author.id}
                                author={author}
                            />
                        </Grid>
                    ))}
                    {(props.authors.length > 4) && <Grid item container direction="column" justify="center">
                        <Button
                            className={classes.showMore}
                            onClick={expandAuthorsList}>
                            {visibleAuthorsCount === 4 ? (
                                <span>Show more</span>
                            ) : (
                                <span>Show less</span>
                            )}
                        </Button>
                    </Grid>}
                </Grid>
            </Grid>
        </Grid>
    );
};
