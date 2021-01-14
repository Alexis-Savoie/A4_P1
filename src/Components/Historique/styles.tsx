import { createStyles, Theme } from "@material-ui/core";

export type historiqueStyles = ("grid" | "form" | "title" | "links" | "root" | "nested")

export default (theme: Theme) => createStyles<historiqueStyles, {}>({
    grid: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",


        alignItems: 'left',
        justifyContent: 'left'
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
    },

    root: {
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    
    nested: {
        paddingLeft: theme.spacing(4),
    }

});

