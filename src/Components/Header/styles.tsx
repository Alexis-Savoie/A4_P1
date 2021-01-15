
import { createStyles, Theme } from "@material-ui/core";

export type headerStyles = ("container" | "form" | "title" | "links" | "root" | "main" | "footer" | "appBar" | "toolbar" | "toolbarTitle" | "link" );

export default (theme: Theme) => createStyles<headerStyles, {}>({
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
    toolbarTitle: {
        flexGrow: 1,
      },

    links: {
        padding: '5px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    link: {
        margin: theme.spacing(1, 1.5),
        
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
      appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      toolbar: {
        flexWrap: 'wrap',
      },
      footer: {
        padding: theme.spacing(3, 2),
        align: 'center',
        marginTop: 'auto',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      },
    
    

});
