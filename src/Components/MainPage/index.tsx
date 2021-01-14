import * as React from 'react'
import styles, { loginStyles } from "./styles"
import { withStyles, WithStyles, Button } from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import { Card, CardContent } from "@material-ui/core"
import axios from 'axios';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';


interface P {
}
interface S {
    destination: any,
    origin: any,
    response: any,
    waypoints: any,
    travelMode: any,
    requestIsDone: boolean,
    list: any[],

    zoom: number,
    lat: number,
    lng: number,

    distance: string,

    devicePosition: string
}



export class MainPage extends React.PureComponent<P & WithStyles<loginStyles>, S> {
    public static Display = withStyles(styles as any)(MainPage) as React.ComponentType<P>

    origin: any;
    destination: any;
    response: any;
    waypoints: any;
    travelMode: any;
    requestIsDone: any;




    constructor(props: any) {
        super(props)
        this.state = {
            response: null,
            origin: '',
            destination: '',
            waypoints: null,
            travelMode: 'DRIVING',
            requestIsDone: false,
            list: [{ location: "" }],

            zoom: 6,
            lat: 48.8534,
            lng: 2.3488,

            distance: "",

            devicePosition: ""


        }

        this.directionsCallback = this.directionsCallback.bind(this)
        //this.getOrigin = this.getOrigin.bind(this)
        //this.getDestination = this.getDestination.bind(this)
        this.getRoute = this.getRoute.bind(this)
        this.getLocalization = this.getLocalization.bind(this)
    }







    // handle input change
    handleInputChangeOrigin = (e: any) => {
        const { value } = e.target;
        this.setState({ origin: value });
    };


    // handle input change for waypoints
    handleInputChange = (e: any, index: number) => {
        const { value } = e.target;
        const list = this.state.list.slice();
        list[index] = value;
        this.setState({ list: list });
    };

    // handle click event of the Remove button
    handleRemoveClick = (index: any) => {
        const list = this.state.list.slice();
        list.splice(index, 1);
        this.setState({ list: list })
    };

    // handle click event of the Add button
    handleAddClick = () => {
        const list = this.state.list.slice();
        if (list.length >= 24)
            alert("Il y'a trop de destinations ! (Max 24)")
        else {
            const updated = list.slice();
            updated.push({ location: "" });
            this.setState({ list: updated });
            //console.log(this.list)
        }

    };


    // Get inputs datas
    getInputsData = () => {
        const list = this.state.list.slice();
        let waypointsURL = ""
        for (let i = 0; i < list.length; i++) {
            if (JSON.stringify(list[i]) != JSON.stringify({ location: "" }))
                waypointsURL += list[i] + "|"
        }
        //console.log("waypointsURL2 : ")
        //console.log(waypointsURL)
    }



    directionsCallback(response: any) {
        if (response !== null) {
            if (response.status === 'OK') {
                this.setState(
                    () => ({
                        response
                    })
                )
            } else {
                //console.log('response: ', response)
            }
        }

        // Set to true to avoid infinite requests before Google block
        this.requestIsDone = true
    }


    getRoute() {
        const list = this.state.list.slice();
        // For checking if there no empty field
        let validLocation = true
        let waypointsURL = ""
        for (let i = 0; i < list.length; i++) {
            if (list[i] != "") {
                if (JSON.stringify(list[i]) != JSON.stringify({ location: "" }))
                    waypointsURL += list[i] + "|"
            }
            else
                validLocation = false
        }

        if (this.state.origin == "")
            validLocation = false

        if (validLocation) {
            // Remove last |
            waypointsURL = waypointsURL.substring(0, waypointsURL.length - 1);


            axios.get(process.env.REACT_APP_API_URL + `/getRoute/` + localStorage.getItem("currentUserToken") + `/` + this.state.origin + `/` + waypointsURL)
                .then(res => {
                    // If the itinerary was succesfully calculated then we add it to history
                    let data = {
                        token: localStorage.getItem('currentUserToken'),
                        origin: this.state.origin,
                        waypoints: waypointsURL
                    }
                    axios.post(process.env.REACT_APP_API_URL + `/addToHistory`, data)
                        .then(res2 => {
                            // Once we have the itinerary we can use the callback
                            this.responseCallback(res.data)
                        })
                        .catch(error => {
                            if (error.response) {
                                if (error.response.status == 403)
                                    alert("Location invalide !")
                                else
                                    alert("Erreur !, veuilleez réesayer plus tard !")
                            }
                            else {
                                alert("Problème serveur réesayer plus tard")
                            }
                        })
                })
                .catch(error => {
                    if (error.reponse) {
                        //console.log(error.response.data)
                        alert("Problème d'input'")
                    }
                    else {
                        if (error.response.status === 403)
                            alert("Adresse invalide")
                        else
                            alert("Problème serveur réesayer plus tard")
                    }
                })
            this.requestIsDone = false
        }
        else
            alert("une ou plusieurs locations sont invalide !")


    }

    responseCallback(res: any) {
        let wp = []
        for (let i = 0; i < res.waypoints.length; i++) {
            wp.push({
                location: res.waypoints[i],
                stopover: true,
            })
        }
        let origin = res.origin
        let destination = res.destination
        let waypoints = wp
        let distance = "Distance : " + res.distance + "km"

        this.setState(
            () => ({
                destination
            })
        )
        this.setState(
            () => ({
                waypoints
            })
        )
        this.setState(
            () => ({
                origin
            })
        )
        this.setState(
            () => ({
                distance
            })
        )

    }



    getLocalization() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const devicePosition = position.coords.latitude + "," + position.coords.longitude
                //console.log("devicePos : " + devicePosition)
                //console.log("origin : " + this.origin)
                //this.origin = devicePosition
                const origin = devicePosition
                this.setState(
                    () => ({
                        origin
                    })
                )
            });
        } else {
            alert("Geoloaction is not supported by your browser");
        }
    }





    render() {
        const { classes } = this.props;
        const style = {
           display: 'flex',
           margin: '-555px 80px 15px -12px',
           with:'30px'
           
            
          };
      
        
        return (
            <div className="map">
                <div className={classes.mapContainer}>
                    <GoogleMap
                        // required
                        id='direction-example'
                        // required
                        mapContainerStyle={{
                            height: '500px',
                            margin: '45px 80px 15px 342px',
                            padding: '1rem',
                            
                        }}
                        // required
                        zoom={this.state.zoom}
                        // required
                        center={{
                            lat: this.state.lat,
                            lng: this.state.lng
                        }}


                        onLoad={(map: any) => {
                            console.log('DirectionsRenderer onLoad map: ')
                            console.log(map)
                        }}
                        // optional
                        onUnmount={(map: any) => {
                            console.log('DirectionsRenderer onUnmount map: ', map)
                        }}
                    >
                        {
                            (
                                this.state.waypoints !== null && this.requestIsDone === false
                            ) && (
                                <DirectionsService
                                    // required
                                    options={{
                                        destination: this.state.destination,
                                        origin: this.state.origin,
                                        travelMode: this.state.travelMode,
                                        waypoints: this.state.waypoints,
                                        optimizeWaypoints: true
                                    }}
                                    // required
                                    callback={this.directionsCallback}
                                    // optional
                                    onLoad={(directionsService: any) => {
                                        console.log('DirectionsService onLoad directionsService: ', directionsService)
                                    }}
                                    // optional
                                    onUnmount={(directionsService: any) => {
                                        console.log('DirectionsService onUnmount directionsService: ', directionsService)
                                    }}
                                />
                            )
                        }

                        {
                            this.state.response !== null && (
                                <DirectionsRenderer
                                    // required
                                    options={{
                                        directions: this.state.response
                                    }}
                                    // optional
                                    onLoad={(directionsService: any) => {
                                        //console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                                    }}
                                    // optional
                                    onUnmount={(directionsService: any) => {
                                        //console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                                    }}
                                />
                            )
                        }
                    </GoogleMap>
                </div>

                
             <div style={style}>
             <Card  >
                   <CardContent>
                   <Typography component="h5" variant="h5">Départ</Typography>

         <input
          name="origin"
          placeholder="Départ"
          value={this.state.origin}
           onChange={e => this.handleInputChangeOrigin(e)}
           />
             <button onClick={this.getLocalization}>Utiliser Position Actuel</button>
               <br></br>
               <Typography component="h5" variant="h5">Points intermédiaire (Max 24)</Typography>
 
                   </CardContent>

                   {this.state.list.map((x: any, i: any) => {
                    return (
                        <div>
                            <div className="box">
                                <input
                                    name="location"
                                    placeholder="Location"
                                    value={x.location}
                                    onChange={e => this.handleInputChange(e, i)}
                                />
                                {this.state.list.length > 1 && <button
                                    className="mr10"
                                    onClick={() => this.handleRemoveClick(i)}>X</button>}
                                {this.state.list.length - 1 === i && <button onClick={this.handleAddClick}>+</button>}

                            </div>
                        </div>
                    );
                })}
                <br></br>
                <Button onClick={this.getRoute} variant="contained" color="secondary" type='submit' >Calculer Itinéraire</Button>
                <br></br>
                <br></br>
                <Typography component="h5" variant="h5">{this.state.distance}</Typography>
               </Card>
             
             </div>


             
            </div>
        )
    }
}
/*
<button onClick={this.getRoute}>Calculer Itinéraire</button>
*/

