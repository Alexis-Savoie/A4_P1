
import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { forgotpasswordStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import history from '../../history'

interface P {
}
interface S {
  email: string,
  
}



export class ForgotPassword extends React.PureComponent<P & WithStyles<forgotpasswordStyles>, S>  {

  public static Display = withStyles(styles as any)(ForgotPassword) as React.ComponentType<P>

  public state: Readonly<S> = {
    email: "",
    
  };


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.container}>
          <Grid item className={classes.title}>
            <h2>Recevoir le mot de passe temporaire</h2>
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

              <br />


              <Button variant="contained" color="secondary" fullWidth type='submit'>
                Envoyer
        </Button>
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

  register = (e: React.FormEvent<HTMLFormElement>) => {
    // Avoir to reload the page
    e.preventDefault()
    const data = {
      email: this.state.email,
     
    }
    // Check if values are valid (regex is for email syntax)
    if (this.state.email == "") {
      alert("Identifiants invalides !")
    }
    else {
      axios.post(`http://localhost:8020/sendTemporaryPassword`, data)
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