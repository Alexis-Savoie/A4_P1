import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { loginStyles } from "./styles"
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


export class Login extends React.PureComponent<P & WithStyles<loginStyles>, S> {



    public static Display = withStyles(styles as any)(Login) as React.ComponentType<P>

    public state: Readonly<S> = {
        email: "",
        password: "",
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.container}>
                    <Grid item className={classes.title}>
                        <Typography component="h1" variant="h5">
                            Connexion
        </Typography>
                    </Grid>


                    <Grid item className={classes.form}>
                        <form onSubmit={this.login}>


                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email" onChange={this.changeVal}
                                />
                            </Grid><br />

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="password"
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password" onChange={this.changeVal}
                                />
                            </Grid>

                            <br />
                            <Button variant="contained" color="secondary" type='submit' fullWidth>
                                Soumettre
                            </Button>

                        </form>
                    </Grid>

                    <Grid item className={classes.links}>
                        <Link to="/register">S'inscrire</Link>
                    </Grid>

                    <Grid item className={classes.links}>
                        <Link to="/forgotpassword">Mot de passe oublié ?</Link>
                    </Grid>
                </Grid>
            </div>

        );
    }

    changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value } as Pick<S, keyof S>)
    }

    login = (e: React.FormEvent<HTMLFormElement>) => {
        // Avoir to reload the page
        e.preventDefault()
        const data = {
            email: this.state.email.trim(),
            password: this.state.password,
        }
        // Check if values are valid (regex is for email syntax)
        // Check if values are valid (regex is for email syntax)
        if (this.state.email == "" || this.state.password == "") {
            alert("Identifiants invalides !")
        }
        else if (this.state.email.trim().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null || this.state.email.trim() == "" || this.state.password == "") {
            alert("Identifiants invalides !")
        }
        else {
            axios.post(process.env.REACT_APP_API_URL + `/login`, data)
                .then(res => {
                    console.log(res.data.message)
                    localStorage.setItem('currentUserToken', res.data.token);
                    history.push('/mainpage');
                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response.data)
                        if (error.response.data.message == "Incorrect username/password")
                            alert("Identifiants invalides !")
                        else if (error.response.data.message == "This user is currently blocked, please try later")
                            alert("Cet utilisateur est bloqué, réessayer plus tard.")
                        else
                            alert("Identifiants invalides !")
                    }
                    else {
                        alert("Problème de serveur, réesayer plus tard")
                    }

                })
        }
    }



}

