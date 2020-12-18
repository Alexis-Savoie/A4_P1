
import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { headerStyles } from "./styles"
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import history from '../../history'

interface P {
}
interface S {
  email: string,
  password: string,
}



export class Header extends React.PureComponent<P & WithStyles<headerStyles>, S>  {

  public static Display = withStyles(styles as any)(Header) as React.ComponentType<P>

  public state: Readonly<S> = {
    email: "",
    password: "",
  };

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
           Uber
          </Typography>
          <Button href="/register" color="primary" variant="outlined" className={classes.link}>
            Register
          </Button>
       
          <Button href="/login" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Uber App
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Devenez chauffeur professionnel'}
            {'Augmentez vos revenus tout en maîtrisant votre emploi du temps.'}
          </Typography>
          <Typography variant="body1">Conduisez quand vous voulez.</Typography>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">My sticky footer can be found here.</Typography>
            
          </Container>
        </footer>
      </div>
    );
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