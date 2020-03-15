import {Button, Theme, withStyles} from "@material-ui/core";
import {yellow} from "@material-ui/core/colors";

export const ThemedButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(yellow[500]),
        marginTop: "1.0em",
        backgroundColor: yellow[500],
        '&:hover': {
            backgroundColor: yellow[600],
        },
        borderRadius: 0
    },
}))(Button);
