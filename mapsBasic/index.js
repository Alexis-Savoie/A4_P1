function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 48.58, lng: 2.14 },
    });
    directionsRenderer.setMap(map);
    document.getElementById("submit").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });

    //#region Geolocation stuff
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        zoom: 10
                    };
                    console.log(pos)
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);

}
//#endregion 

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const checkboxArray = document.getElementById("waypoints");

    // Get all waypoints
    dests = []
    for (let i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
            dests.push(checkboxArray[i].value);
        }
    }
    // Add the destination to make a array of every stop point except the start
    dests.push(document.getElementById("end").value);

    // Create an array of every possible destinations, and then rely on google waypoints optimization to get the fatest route possible
    routes = []
    destsLen = dests.length
    for (let i = 0; i < destsLen; i++) {
        waypoints = []
        bDests = dests.slice()
        let buffer = bDests[destsLen - 1]
        bDests[destsLen - 1] = bDests[i]
        bDests[i] = buffer
        for (let i = 0; i < bDests.length - 1; i++) {
            waypoints.push({
                location: bDests[i],
                stopover: true,
            });
        }
        routes.push([waypoints, bDests[destsLen - 1]])
    }


    resRoutes = []
    listDuration = []

    // Use a calback because request are async
    function getRoutes(routes, callback) {
        for (let i = 0; i < routes.length; i++) {
            directionsService.route({
                    origin: document.getElementById("start").value,
                    destination: routes[i][1],
                    waypoints: routes[i][0],
                    optimizeWaypoints: true,
                    region: "FR",
                    language: "fr",
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    if (status === "OK") {
                        resRoutes.push(response)

                        i = 0
                        totalTime = 0
                        while (i < response.routes[0].legs.length) {
                            totalTime += response.routes[0].legs[i].duration.value
                            i = i + 1
                        }
                        listDuration.push(totalTime)
                            //console.log(totalTime)

                        const summaryPanel = document.getElementById("directions-panel");
                        summaryPanel.innerHTML = "";

                        // Once every route was obtained we start the callcback
                        if (listDuration[routes.length - 1] != undefined) {
                            console.log("done")
                            callback(resRoutes, listDuration);
                        }

                    } else {
                        window.alert("Directions request failed due to " + status);
                    }
                }

            );
        }
    }

    // Wait for all requests to finish using a callback
    // And then compare what is the fastest route
    getRoutes(routes, function(resRoutes, listDuration) {
        console.log(listDuration);
        let index = 0;
        let value = listDuration[0];
        for (let i = 1; i < listDuration.length; i++) {
            if (listDuration[i] < value) {
                value = listDuration[i];
                index = i;
            }
        }
        console.log(listDuration[index])


        directionsRenderer.setDirections(resRoutes[index]);
        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;
            summaryPanel.innerHTML +=
                "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML += route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
        }
    });









    //console.log("fastest route is : " + listDuration[0] + " " + index)
    //console.log(listDuration)
    //console.log(resRoutes)


}