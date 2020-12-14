import * as React from 'react'
import styles, { historiqueStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';



interface P {
}
interface S {
}

export class HistoriquePage extends React.PureComponent<P & WithStyles<historiqueStyles>, S> {



    public static Display = withStyles(styles as any)(HistoriquePage) as React.ComponentType<P>

    public state: Readonly<S> = {

    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.container}>
                    <Grid item className={classes.title}>
                        <h2>HistoriquePage</h2>
                    </Grid>
                </Grid>
            </div>

        );
    }





}

