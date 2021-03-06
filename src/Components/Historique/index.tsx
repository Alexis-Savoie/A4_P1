import * as React from 'react'
import styles, { historiqueStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import history from '../../history'



import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';



interface P {
}
interface S {
    history: Array<Object>,
    isEmpty: boolean,
    isRequestDone: boolean
}

export class HistoriquePage extends React.PureComponent<P & WithStyles<historiqueStyles>, S> {

    public static Display = withStyles(styles as any)(HistoriquePage) as React.ComponentType<P>

    public state: Readonly<S> = {
        history: [{}],
        isEmpty: false,
        isRequestDone: false
    };


    render() {
        this.getHistory()
        const { classes } = this.props;
        const { history } = this.state;
        if (this.state.isEmpty == false) {
            return (
                <div><div>
                    <Typography component="h1" variant="h5">Historique</Typography>
                    <Grid container spacing={1} className={classes.grid}>
                        {history.map((item: any) => {
                                let waypointsString = ""

                                if (item.waypoints) {
                                    waypointsString = item.waypoints.split("|").join(", ");
                                }
                                // Generate a row for each itinerary of the history
                                return (
                                    <Grid item >
                                        <hr></hr>
                                        <div>
                                            <Grid>
                                                <span>Point de départ : {item.origin}</span>
                                                <p>Points intermédiaire : {waypointsString} </p>
                                            </Grid>
                                        </div>
                                    </Grid>

                                )
                            
                            /*
                            else {
                                return (
                                    <div>
                                        <Typography component="h1" variant="h5">Historique</Typography>
                                        <Typography component="h1" variant="h5">Votre historique est actuellement vide !</Typography>
                                    </div>
                                )
                            }
*/
                        })

                        }

                    </Grid>
                    <hr></hr>
                </div></div>
            );
        }
        else
        {
            return (
                <div>
                    <Typography component="h1" variant="h5">Historique</Typography>
                    <hr></hr>
                    <br></br>
                    <Typography component="h5" variant="h5">Votre historique est actuellement vide !</Typography>
                </div>
            )
        }



    }

    getHistory() {
        if (this.state.isRequestDone == false) {
            this.setState({ isRequestDone: true });
            axios.get(process.env.REACT_APP_API_URL + `/getHistory/` + localStorage.getItem("currentUserToken"))
                .then(res => {
                    this.setState({ history: res.data.history });

                    console.log("history")
                    console.log(this.state.history)
                })
                .catch(error => {
                    console.log(error.response.data)
                    if (error.response) {
                        if (error.response.data.message == "This user have an empty history")
                            this.setState({ isEmpty: true });
                        else
                            alert("Problème serveur réesayer plus tard")
                    }
                    else {
                        alert("Problème serveur réesayer plus tard")
                    }
                })
            //this.setState({history: {itinerary : "lololololol"}});
        }

    }
}
