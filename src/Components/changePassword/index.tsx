import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { loginStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
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
                        <Typography component="h1" variant="h5">Changer de mot de passe</Typography>
                    </Grid>


                    <Grid item className={classes.form}>
                        <form onSubmit={this.submitPasswordChange}>


                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="oldPassword"
                                    label="Mot de passe actuel"
                                    type="password"
                                    name="oldPassword"
                                    autoComplete="origin" onChange={this.changeVal}
                                />
                            </Grid><br />
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="newPassword"
                                    label="Nouveau mot de passe"
                                    type="password"
                                    id="newPassword"
                                    autoComplete="waypoints" onChange={this.changeVal}
                                />
                            </Grid><br />
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="newPassword2"
                                    label="Confirmer le mot de passe"
                                    type="password"
                                    id="newPassword2"
                                    autoComplete="waypoints" onChange={this.changeVal}
                                />
                            </Grid><br />

                            <Button variant="contained" color="secondary" type='submit' fullWidth>Soumettre</Button>

                        </form>
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
                        if (error.response) {
                            console.log(error.response.data)
                            if (error.response.status == 401)
                                alert("Mot de passe incorrect !")
                            else
                                alert("Erreur ! Réesayer plus tard")
                        }
                        else {
                            console.log(error)
                            alert("Problème de serveur, réesayer plus tard")
                        }
                    })
            }
        }
    }
}
