import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { logoutStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import history from '../../history'



interface P {
}
interface S {
    email: string,
    password: string,
}


export class Logout extends React.PureComponent<P & WithStyles<logoutStyles>, S> {
    public static Display = withStyles(styles as any)(Logout) as React.ComponentType<P>

    render() {
        const { classes } = this.props;

        const data = {
            token: localStorage.getItem('currentUserToken')
        }
        axios.post(process.env.REACT_APP_API_URL + `/logout`, data)
        .then(res => {
            console.log(res.data.message)
            localStorage.removeItem("currentUserToken")
            history.push('/login');
        })
        .catch(error => {
            if (error.reponse) {
                console.log(error.response.data)
                localStorage.removeItem("currentUserToken")
                history.push('/login');
            }
            else {
                localStorage.removeItem("currentUserToken")
                history.push('/login');
            }

        })

        return (
            <p>Déconnexion</p>
        );
    }
}
