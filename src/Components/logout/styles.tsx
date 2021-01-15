import { createStyles, Theme } from "@material-ui/core";

export type logoutStyles = ("container");

export default (theme: Theme) => createStyles<logoutStyles, {}>({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",

        
        alignItems: 'center',
        justifyContent: 'center'
    }

});

