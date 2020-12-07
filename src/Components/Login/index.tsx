import * as React from 'react'
import styles, { loginStyles  } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';

import { FormHelperText } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useRef } from 'react';
import { Autorenew } from '@material-ui/icons';

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
            <div className={classes.root}>

                <h2>Login</h2>
                <form onSubmit={this.login}>
                    <InputLabel htmlFor="my-input">Email</InputLabel>
                    <InputEmail  id="email"  name="email"   onChange={this.changeVal} />

                    <InputLabel htmlFor="my-input">Mot de passe</InputLabel>
                    <InputPassword id="password"  name="password"  onChange={this.changeVal} type="password" />
                    <br />
                    <LoginButton variant="contained" color="secondary" type='submit'>Connexion</LoginButton>
                </form>

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
            password: this.state.password.trim(),
        }
        axios.post(`http://localhost:8020/login`, data)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('currentUser', JSON.stringify(res.data)); 
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }



}

const gridLogin = withStyles({
    root: {
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center', 
        height: '100vh'
    },
})(Grid);

const InputEmail = withStyles({
    root: {

        marginBottom:'2rem',
        color:'white'
    },
})(TextField);

const InputPassword = withStyles({
    root: {

        marginBottom:'2rem',
        color:'white'
    },
})(TextField);

const LoginButton = withStyles({
    root: {
        color: 'white',
        backgroundColor:'black',
        height: '60px',
        fontSize:'25px',
        borderRadius: '10px',
        textTransform: 'capitalize',
        '&:hover': {
            color: 'black',
            backgroundColor:'white',
        },
    },
})(Button);
