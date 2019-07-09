function myFunction() {
    // create variable named map, set viewpoint and default zoom level
    //var map = L.map('map').setView([52.201675, 10.507759], 7);
    var map = L.map('map').setView([41.657398, -0.878513], 13);


// add tile layer 
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    }).addTo(map);

// add a minimal zoom to prevent users from zooming out too far
    map._layersMinZoom = 5;

/*
    var srf = L.icon({
        iconUrl: 'icons/SRF.png',// path to the icon
        iconSize: [60, 52],// size of the icon
        iconAnchor: [0, 26],// point of the icon which will correspond to marker's location
        popupAnchor: [35, -26]// point of the icon where the popup window will open
    });

    var rp = L.icon({
        iconUrl: 'icons/RPData.png',
        iconSize: [52, 60],
        iconAnchor: [26, 60],
        popupAnchor: [0, -60]
    });

    var p1 = L.marker([47.417563, 8.560453], {icon: srf}).addTo(map);
    var p2 = L.marker([51.233059, 6.698716], {icon: rp}).addTo(map);

    // this is basic html! Visit http://www.w3schools.com/tags to learn about html tags!
    p1.bindPopup("<strong style='color: #84b819'>SRF Data</strong><br>Schweizer Rundfunk und Fernsehen | Zürich<br>Head: Sandra Manca");

// the .openPopup() opens this popup when the page is loaded
    p2.bindPopup("<strong style='color: #84b819'>RP Data</strong><br>Rheinsiche Post | Düsseldorf<br>Head: Phil Ninh").openPopup();
*/

//var popup = L.popup();
// load json-file  
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "https://master-seu-iot-rest-api.herokuapp.com/metric/lst",
            dataType: "json",
            crossDomain: true,
            mimeType: "application/json",
            beforeSend: setHeader,
            success: function (data) {
                processData(data);
            },
            error: function () {
                alert('Failed!!');
            }

        });
    });

    function setHeader(xhr) {
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        // xhr.setRequestHeader("acept","application/json");
        // xhr.setRequestHeader("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    }

    /*$.ajax({

        url: 'https://www.googleapis.com/moderator/v1/series?key='+key,
        data: myData,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function() { alert("Success"); },
        error: function() { alert('Failed!'); },
        beforeSend: setHeader
    });*/

    function processData(allText) {

        for (var i in allText) {
            data = allText[i];
            // var customicon = L.icon({
            //     // the iconUrl is now the ith element in data.icon
            //     iconUrl: data.icon,
            //     iconSize: [52, 60], // size of the icon
            //     iconAnchor: [26, 60], // point of the icon which will correspond to marker's location
            //     popupAnchor: [0, -60] // point of the icon where the popup window will open
            var customicon = L.AwesomeMarkers.icon({
                    icon: 'bell',
                    prefix: 'glyphicon',
                    markerColor: 'red'
            }
            );
            if (data.userId === 3) {
                // customicon = L.icon({
                //     iconUrl: data.icon,
                //     iconSize: [60, 52],
                //     iconAnchor: [60, 26],
                //     popupAnchor: [-35, -26]
                    customicon = L.AwesomeMarkers.icon({
                        icon: 'bell',
                        prefix: 'glyphicon',
                        markerColor: 'red'
                    }
                );
            }
            ;
            if (data.userId === 1) {
                // customicon = L.icon({
                //     iconUrl: data.icon,
                //     iconSize: [60, 52],
                //     iconAnchor: [60, 26],
                //     popupAnchor: [-35, -26]
                    customicon = L.AwesomeMarkers.icon({
                            icon: 'star',
                            prefix: 'glyphicon',
                            markerColor: 'blue'
                    }
                );
            }
            ;
            if (data.userId === 2) {
                    // customicon = L.icon({
                    //     iconUrl: data.icon,
                    //     iconSize: [60, 52],
                    //     iconAnchor: [0, 26],
                    //     popupAnchor: [35, -26]
                    customicon = L.AwesomeMarkers.icon({
                        icon: 'cloud',
                        prefix: 'glyphicon',
                        markerColor: 'green'
                    }
                );
            }
            ;

            var sdt = data.dateTime;
            var dt = new Date(sdt);
            var h = dt.getHours() + ":" + dt.getMinutes();
            // add the marker to the map
            L.marker([data.latitude, data.longitude], {icon: customicon}
            // L.marker([data.latitude, data.longitude], {icon: L.AwesomeMarkers.icon({
            //         icon: 'bell',
            //         prefix: 'glyphicon',
            //         markerColor: 'red'})
            // }
            ).addTo(map)

                .bindPopup("<strong style='color: #84b819'> Usuario: " + data.userId + "</strong>" +
                    "<br>Dispositivo: " + data.deviceId + " | Temperatura: " + data.temperature + "" +
                    "<br>Humedad: " + data.humidity + " | Viento: " + data.windSpeed + "" +
                    "<br>Temperatura Sensor: " + data.sensorTemperature + " | Hora: " + h + "" +
                    "<br>Icono: " + customicon.icon)

// close the loop, the function processData(allText) and myFunction()
        }
    } //end processData

}//end myFunction()