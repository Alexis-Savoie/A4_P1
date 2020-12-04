import * as React from 'react'
import styles, { Styles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';

import { FormHelperText } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useRef } from 'react';

interface P {
}
interface S {
    email: string,
    password: string,
}


export class Login extends React.PureComponent {

    public state: Readonly<S> = {
        email: "",
        password: "",
    };


    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.login}>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input  id="email"  name="email"  onChange={this.changeVal} />


                    <Input id="password"  name="password"  onChange={this.changeVal} placeholder="Password" />
                    <br />
                    <Button variant="contained" color="secondary" type='submit'>
                        Connexion
        </Button>
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
        
        const data = { // définir les data à envoyer
            email: this.state.email.trim(),
            password: this.state.password.trim(),
        }
        axios.post(`http://localhost:8020/login`, data)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('currentUser', JSON.stringify(res.data)); // stock les informations de l'utilisateurs en front
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

}


