import { createStyles, Theme } from "@material-ui/core";

export type loginStyles = ("root"); // add class create

export default (theme: Theme) => createStyles<loginStyles, {}>({
    root: {
        flex: 1,
        display: 'flex',
        padding: '25px',
        minHeight: '64px',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    }

});

