
import * as React from 'react'
import { Route, Redirect } from "react-router-dom";
import styles, { footerStyles } from "./styles"
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

import Container from '@material-ui/core/Container';

import history from '../../history'

interface P {
}
interface S {
  email: string,
  password: string,
}



export class Footer extends React.PureComponent<P & WithStyles<footerStyles>, S>  {

  public static Display = withStyles(styles as any)(Footer) as React.ComponentType<P>

  public state: Readonly<S> = {
    email: "",
    password: "",
  };

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Sticky footer
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Pin a footer to the bottom of the viewport.'}
            {'The footer will move as the main element of the page grows.'}
          </Typography>
          <Typography variant="body1">Sticky footer placeholder.</Typography>
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