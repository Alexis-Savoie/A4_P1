import * as React from 'react'
import styles, { loginStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, MapContext, useGoogleMap } from '@react-google-maps/api';




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
            devicePosition: ""


        }

        this.directionsCallback = this.directionsCallback.bind(this)
        //this.getOrigin = this.getOrigin.bind(this)
        //this.getDestination = this.getDestination.bind(this)
        this.getRoute = this.getRoute.bind(this)
        this.onMapClick = this.onMapClick.bind(this)
        this.getLocalization = this.getLocalization.bind(this)

        //const updated = this.state.list.slice(); 
        //updated.push({ location: "" }); 
        //this.setState({list:updated}); 

        //this.list = [{ location: "" }]

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
            waypointsURL += list[i] + "/"

        }
        console.log(waypointsURL)
    }














    directionsCallback(response: any) {
        console.log("salut 5!")
        //console.log(this.state.waypoints)
        //console.log(this.destination)
        //console.log(response)

        if (response !== null) {
            if (response.status === 'OK') {
                this.setState(
                    () => ({
                        response
                    })
                )
            } else {
                console.log('response: ', response)
            }
        }

        // Set to true to avoid infinite requests before Google block
        this.requestIsDone = true
    }


    /*
        getOrigin(ref: any) {
            this.origin = ref
        }
    
        getDestination(ref: any) {
            this.destination = ref
        }
    */
    getRoute() {
        console.log("salut !3")

        const list = this.state.list.slice();
        console.log("new code : ")
        console.log(list)
        let waypointsURL = ""
        for (let i = 0; i < list.length; i++) {
            waypointsURL += list[i] + "|"
        }
        waypointsURL = waypointsURL.substring(0, waypointsURL.length - 1);
        console.log(waypointsURL)

        axios.get(`http://localhost:8020/getRoute/eyJhbGciOiJIUzI1NiJ9.YWxleGlzLnNhdm9pZUBmcmVlLmZy.sfLMpIpvYbL5Uzb8VVblN2jYRMqFEETLcivyKg2n6KY/` + this.state.origin + `/` + waypointsURL)
            .then(res => {
                //console.log(res.data.route)
                //console.log(res.data.route.status)
                console.log("res.data.origin")
                this.responseCallback(res.data)


            })
            .catch(error => {
                if (error.reponse) {
                    console.log(error.response.data)
                    alert("Problème d'input'")
                }
                else {
                    if (error.response.status == 403)
                        alert("Adresse invalide")
                    else
                        alert("Problème serveur réesayer plus tard")
                }
            })
        this.requestIsDone = false
        console.log("yo")


    }

    responseCallback(res: any) {
        let wp = []
        console.log("salut 4!1")
        console.log(res.waypoints.length)
        for (let i = 0; i < res.waypoints.length; i++) {
            wp.push({
                location: res.waypoints[i],
                stopover: true,
            })
        }
        let origin = res.origin
        let destination = res.destination
        let waypoints = wp

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
        console.log("salut 4!2")
        console.log(this.state.waypoints)

    }



    onResizeFunc(...args: any) {
        console.log("resized :")
        console.log(args)
    }



    onCenterChangedFunc(...args: any) {
        console.log("center changed :")
    }


    onMapClick(...args: any) {
    }

    getLocalization() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const devicePosition = position.coords.latitude + "," + position.coords.longitude
                console.log("devicePos : " + devicePosition)
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

        return (
            
            <div className='map'>
                <div className='map-container'>
                    <GoogleMap
                        // required
                        id='direction-example'
                        // required
                        mapContainerStyle={{
                            height: '400px',
                            width: '100%'
                        }}
                        // required
                        zoom={this.state.zoom}
                        // required
                        center={{
                            lat: this.state.lat,
                            lng: this.state.lng
                        }}
                        // optional
                        onClick={this.onMapClick}
                        onResize={this.onResizeFunc}
                        onCenterChanged={this.onCenterChangedFunc}

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
                                this.state.waypoints != null && this.requestIsDone == false
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
                <label>Départ</label>
                <br></br>
                <input
                    name="origin"
                    placeholder="Départ"
                    value={this.state.origin}
                    onChange={e => this.handleInputChangeOrigin(e)}
                />
                <button onClick={this.getLocalization}>getDeviceLocation</button>
                <br></br>
                <label>Waypoints (Max 24)</label>
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
                <button onClick={this.getRoute}>getRoute</button>
            </div>
        )
    }
}

