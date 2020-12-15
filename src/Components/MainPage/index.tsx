import * as React from 'react'
import styles, { loginStyles } from "./styles"
import { Grid, TextField, Button, withStyles, WithStyles } from "@material-ui/core"
import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';




interface P {
}
interface S {
    destination: any,
    origin: any,
    response: any,
    waypoints: any,
    travelMode: any

}

export class MainPage extends React.PureComponent<P & WithStyles<loginStyles>, S> {
    public static Display = withStyles(styles as any)(MainPage) as React.ComponentType<P>




    origin: any;
    destination: any;
    response: any;
    waypoints: any;
    travelMode: any;


    constructor(props: any) {
        super(props)

        this.state = {
            response: null,
            origin: 'Arpajon',
            destination: '',
            waypoints: null,
            travelMode: 'DRIVING',
        }

        this.directionsCallback = this.directionsCallback.bind(this)
        this.getOrigin = this.getOrigin.bind(this)
        this.getDestination = this.getDestination.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onMapClick = this.onMapClick.bind(this)
        console.log("START")
        console.log(this.waypoints)
    }

    directionsCallback(response: any) {
        console.log("salut 5!")
        console.log(this.state.waypoints)
        console.log(this.destination)
        console.log(response)

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
    }



    getOrigin(ref: any) {
        this.origin = ref
    }

    getDestination(ref: any) {
        this.destination = ref
    }

    onClick() {
        console.log("salut !3")

        axios.get(`http://localhost:8020/getRoute/eyJhbGciOiJIUzI1NiJ9.YWxleGlzLnNhdm9pZUBmcmVlLmZy.sfLMpIpvYbL5Uzb8VVblN2jYRMqFEETLcivyKg2n6KY/Arpajon 91290/Dourdan,91200|Etampes, 91223`)
            .then(res => {
                //console.log(res.data.route)
                //console.log(res.data.route.status)
                let response = res.data.route
                console.log("Objet en JSON : ")
                console.log(JSON.stringify(response))

                console.log("Type de l'objet: ")
                console.log(typeof(response))
                if (response.status === 'OK') {
                    this.setState(
                        () => ({
                            response
                        })
                    )
                } else {
                    console.log('response: ', response)
                }


            })
            .catch(error => {
                if (error.reponse) {
                    console.log(error.response.data)
                    //alert("Problème de serveur, réesayer plus tard")
                }
                else {
                    //alert("Problème de serveur, réesayer plus tard")
                }
            })
        console.log("yo")


    }

    responseCallback(waypts: any) {
        let arr = waypts.split("|");
        let wp = []

        for (let i = 0; i < arr.length - 1; i++) {
            wp.push({
                location: arr[i],
                stopover: true,
            })
        }

        let destination = waypts.split("|")[arr.length - 1]

        let waypoints = wp

        console.log()

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

        

        console.log("salut 4!")
        console.log(waypts)
        console.log(waypts.split("|")[arr.length - 1])
        console.log(this.state.waypoints)

    }






    onMapClick(...args: any) {
        console.log('onClick args: ', args)
        console.log("salut !2")


    }

    render() {



        return (
            <div className='map'>
                <div className='map-settings'>
                    <hr className='mt-0 mb-3' />

                    <div className='row'>
                        <div className='col-md-6 col-lg-4'>
                            <div className='form-group'>
                                <label htmlFor='ORIGIN'>Origin</label>
                                <br />
                                <input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} />
                            </div>
                        </div>

                        <div className='col-md-6 col-lg-4'>
                            <div className='form-group'>
                                <label htmlFor='DESTINATION'>Destination</label>
                                <br />
                                <input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} />
                            </div>
                        </div>
                    </div>


                    <button className='btn btn-primary' type='button' onClick={this.onClick}>Build Route</button>
                </div>

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
                        zoom={2}
                        // required
                        center={{
                            lat: 0,
                            lng: -180
                        }}
                        // optional
                        onClick={this.onMapClick}
                        // optional
                        onLoad={(map: any) => {
                            console.log('DirectionsRenderer onLoad map: ', map)
                        }}
                        // optional
                        onUnmount={(map: any) => {
                            console.log('DirectionsRenderer onUnmount map: ', map)
                        }}
                    >



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
            </div>
        )
    }


}

