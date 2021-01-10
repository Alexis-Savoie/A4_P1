import * as React from 'react'
import styles, { historiqueStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';



interface P {
}
interface S {
    origin: string,
    waypoints: string,
}

export class HistoriquePage extends React.PureComponent<P & WithStyles<historiqueStyles>, S> {



    public static Display = withStyles(styles as any)(HistoriquePage) as React.ComponentType<P>

    public state: Readonly<S> = {
        origin: "",
        waypoints: "",
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.container}>
                    <Grid item className={classes.title}>
                    <Typography component="h1" variant="h5">
          Historique
        </Typography>
                    </Grid>


                    <Grid item className={classes.form}>
                        <form onSubmit={this.history}>


                        <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="origin"
                label="origin"
                name="origin"
                autoComplete="origin" onChange={this.changeVal}
              />
            </Grid><br/>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="waypoints"
                label="waypoints"
                type="waypoints"
                id="waypoints"
                autoComplete="waypoints" onChange={this.changeVal} 
              />
            </Grid>
          
                        
                            <br />
                            <Button variant="contained" color="secondary" type='submit' fullWidth>
                               Get History
                             </Button>
                           
                        </form>
                    </Grid>

                    <Grid item className={classes.links}>
                        <Link to="/register">S'inscrire</Link>
                    </Grid>


                </Grid>
            </div>

        );

    }


    changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value } as Pick<S, keyof S>)
    }

    history = (e: React.FormEvent<HTMLFormElement>) => {
        // Avoir to reload the page
        e.preventDefault()
        const data = {
            origin: this.state.origin.trim();
            waypoints : this.state.waypoints.split('|');
    
        }
        // Check if values are valid (regex is for email syntax)
        if (this.state.waypoints.[split]('|')); 
        {
            alert("Identifint sythax est incorrect !")
        }
        else {
            axios.post(`http://localhost:8020/history`, data)
                .then(res => {
                    console.log(res.data.message)
                    localStorage.setItem('currentUserToken', res.data.token);
                    if (res.data.history)
                        localStorage.setItem('history', res.data.history);
                    else
                        localStorage.setItem('history', "");
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