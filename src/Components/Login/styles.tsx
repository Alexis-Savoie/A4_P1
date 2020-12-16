import { createStyles, Theme } from "@material-ui/core";

export type loginStyles = ("container" | "form" | "title" | "links" );

export default (theme: Theme) => createStyles<loginStyles, {}>({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",

        
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    form: {
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingBottom: '10px',
        width: '20%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
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

