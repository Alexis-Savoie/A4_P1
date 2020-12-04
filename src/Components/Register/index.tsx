import * as React from 'react'
import styles, { Styles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { FormHelperText } from '@material-ui/core';
import { Input } from '@material-ui/core';






export class Register extends React.PureComponent {
  render() {
    return (
      <div>
        <h2>Register</h2>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />


          <Input id="standard-password-input" type="password" aria-describedby="my-helper-text" placeholder="Password" />
          <br />
          <Button variant="contained" color="secondary">
            Register
        </Button>
        </FormControl>
      </div>
    );
  }
}