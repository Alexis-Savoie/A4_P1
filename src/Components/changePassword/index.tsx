import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { loginStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import history from '../../history'
import { Writable } from 'stream';



interface P {
}
interface S {
    oldPassword: string,
    newPassword: string,
    newPassword2: string,
}


export class changePassword extends React.PureComponent<P & WithStyles<loginStyles>, S> {

    public static Display = withStyles(styles as any)(changePassword) as React.ComponentType<P>

    public state: Readonly<S> = {
        oldPassword: "",
        newPassword: "",
        newPassword2: ""
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.container}>
                    <Grid item className={classes.title}>
                        <h2>Changer de mot de passe</h2>
                    </Grid>


                    <Grid item className={classes.form}>
                        <form onSubmit={this.submitPasswordChange}>
                            <InputLabel >Mot de passe actuel</InputLabel>
                            <InputPassword id="oldPassword" name="oldPassword" onChange={this.changeVal} type="password" />
                            <InputLabel>Nouveau mot de passe</InputLabel>
                            <InputPassword id="newPassword" name="newPassword" onChange={this.changeVal} type="password" />
                            <InputLabel>Confirmer le mot de passe</InputLabel>
                            <InputPassword id="newPassword2" name="newPassword2" onChange={this.changeVal} type="password" />
                            <br />
                            <LoginButton variant="contained" color="secondary" type='submit'>Soumettre</LoginButton>
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

    submitPasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
        // Avoir to reload the page
        e.preventDefault()
        const data = {
            token: localStorage.getItem('currentUserToken'),
            password: this.state.oldPassword,
            password2: this.state.newPassword
        }
        // Check if values are not empty
        if (this.state.oldPassword == "" || this.state.newPassword == "" || this.state.newPassword2 == "") {
            alert("Veuillez entrer des valeurs non-vide !")
        }
        else {
            // CHeck if input passwords are the same
            if (this.state.newPassword != this.state.newPassword2) {
                alert("Les mots de passe ne sont pas identique !")
            }
            else {
                axios.put(process.env.REACT_APP_API_URL + `/changePassword`, data)
                    .then(res => {
                        console.log(res.data.message)
                        localStorage.getItem('currentUserToken');
                        alert("Mot de passe modifié avec succès !")
                        history.push('/mainpage');
                    })
                    .catch(error => {
                        if (error.reponse) {
                            console.log(error.response.data)
                            //alert("Problème de serveur, réesayer plus tard")
                        }
                        else {
                            //alert("Problème de serveur, réesayer plus tard")
                        }
                    })
            }
        }
    }
}


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
