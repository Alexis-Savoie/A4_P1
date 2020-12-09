
import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { mapStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import history from '../../history'


interface P {
}
interface S {
    email: string,
    password: string,
}


export class Map extends React.PureComponent<P & WithStyles<mapStyles>, S> {



    public static Display = withStyles(styles as any)(Map) as React.ComponentType<P>

    public state: Readonly<S> = {
        email: "",
        password: "",
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel esse eius sapiente. Magnam illo pariatur a, consequuntur eum, perferendis autem hic voluptatibus illum deleniti velit est distinctio! Laboriosam, placeat sequi.
        </p>

            </div>

        );
    }





}


