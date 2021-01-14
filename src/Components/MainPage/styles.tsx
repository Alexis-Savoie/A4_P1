import { createStyles, Theme } from "@material-ui/core";

export type loginStyles = ("container" | "form" | "title" | "links" | "mapContainer"  );

export default (theme: Theme) => createStyles<loginStyles, {}>({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",  
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'center',
    },

    links: {
        padding: '5px',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mapContainer: {
        alignItems: 'left',
        justifyContent: 'left',
    }
    // map:{
    //     height: '500px',
    //     background-color: 'white',
    //     padding: '1rem',
    //     border-radius: '20px',
    //     margin-top: '16px',
    //     box-shadow: '0 0 8px -4px rgba(0, 0, 0, 0.5)'
    // }


});



