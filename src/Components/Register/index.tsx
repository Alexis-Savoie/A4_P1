
import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { registerStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import history from '../../history'

interface P {
}
interface S {
  email: string,
  password: string,
}



export class Register extends React.PureComponent<P & WithStyles<registerStyles>, S>  {

  public static Display = withStyles(styles as any)(Register) as React.ComponentType<P>

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
          Inscription
        </Typography>
          </Grid>


          <Grid item className={classes.form}>
            <form onSubmit={this.register}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email" onChange={this.changeVal}
              />
            </Grid><br/>
             
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password" onChange={this.changeVal} 
              />
            </Grid>
              <br />


              <Button variant="contained" color="secondary" type='submit' fullWidth>
                Register
        </Button>
        <br/><br/>
        <Grid container justify="flex-end"> 
       
            <Grid item>
              <Link to="/login">
              Vous disposez d'un compte ?  Connexion
              </Link>
            </Grid>
          </Grid>
            </form>
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

  register = (e: React.FormEvent<HTMLFormElement>) => {
    // Avoir to reload the page
    e.preventDefault()
    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    // Check if values are valid (regex is for email syntax)
    if (this.state.email == "" || this.state.password == "") {
      alert("Identifiants invalides !")
    }
    else {
      axios.post(`http://localhost:8020/register`, data)
        .then(res => {
          console.log(res.data.message)
          history.push('/login');
        })
        .catch(error => {
          if (error.reponse) {
            console.log(error.response.data)
            alert("veillez emplir !")
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