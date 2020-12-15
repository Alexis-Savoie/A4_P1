
import { createStyles, Theme } from "@material-ui/core";

export type footerStyles = ("container" | "form" | "title" | "links" | "root" | "main" | "footer" );

export default (theme: Theme) => createStyles<footerStyles, {}>({
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
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
      main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
      },
      footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      },
    
    

});
