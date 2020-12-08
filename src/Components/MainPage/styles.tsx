import { createStyles, Theme } from "@material-ui/core";

export type loginStyles = ("container" | "form" | "title" | "links" );

export default (theme: Theme) => createStyles<loginStyles, {}>({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",

        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    form: {
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingBottom: '10px',
    },

    title: {
        padding: '25px',
        alignItems: 'center',
        justifyContent: 'center'
    },

    links: {
        padding: '5px',
        alignItems: 'center',
        justifyContent: 'center'
    }

});

