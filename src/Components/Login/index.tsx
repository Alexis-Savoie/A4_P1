import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { loginStyles } from "./styles"
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
                        <h2>Se connecter</h2>
                    </Grid>


                    <Grid item className={classes.form}>
                        <form onSubmit={this.login}>
                            <InputLabel htmlFor="my-input">Email</InputLabel>
                            <InputEmail id="email" name="email" onChange={this.changeVal} />

                            <InputLabel htmlFor="my-input">Mot de passe</InputLabel>
                            <InputPassword id="password" name="password" onChange={this.changeVal} type="password" />
                            <br />
                            <LoginButton variant="contained" color="secondary" type='submit'>Connexion</LoginButton>
                        </form>
                    </Grid>

                    <Grid item className={classes.links}>
                        <Link to="/register">S'inscrire</Link>
                    </Grid>

                    <Grid item className={classes.links}>
                        <Link to="/register">Mot de passe oublié ?</Link>
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
        if (this.state.email.trim().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null || this.state.email.trim() == "" || this.state.password == "") 
        {
            alert("Identifiants invalides !")
        }
        else {
            axios.post(`http://localhost:8020/login`, data)
                .then(res => {
                    console.log(res.data.message)
                    localStorage.setItem('currentUserToken', res.data.token);
                    history.push('/mainpage');
                })
                .catch(error => {
                    if (error.reponse) {
                        console.log(error.response.data)
                        alert("Identifiants invalides !")
                    }
                    else {
                        alert("Problème de serveur, réesayer plus tard")
                    }

                })
        }
    }



}


const InputEmail = withStyles({
    root: {

        marginBottom: '2rem',
        color: 'white'
    },
})(TextField);

const InputPassword = withStyles({
    root: {

        marginBottom: '2rem',
        color: 'white'
    },
})(TextField);

const LoginButton = withStyles({
    root: {
        color: 'white',
        backgroundColor: 'black',
        height: '60px',
        fontSize: '25px',
        borderRadius: '10px',

        alignItems: 'center',
        justifyContent: 'center',

        textTransform: 'capitalize',
        '&:hover': {
            color: 'black',
            backgroundColor: 'white',
        },
    },
})(Button);
