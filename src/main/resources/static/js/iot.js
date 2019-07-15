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
    }

    function processData(allText) {

        for (var i in allText) {
            data = allText[i];
            var customicon = L.AwesomeMarkers.icon({
                    icon: 'bell',
                    prefix: 'glyphicon',
                    markerColor: 'red'
            }
            );
            if (data.userId === 3) {
                    customicon = L.AwesomeMarkers.icon({
                        icon: 'bell',
                        prefix: 'glyphicon',
                        markerColor: 'red'
                    }
                );
            }
            ;
            if (data.userId === 1) {
                    customicon = L.AwesomeMarkers.icon({
                            icon: 'star',
                            prefix: 'glyphicon',
                            markerColor: 'blue'
                    }
                );
            }
            ;
            if (data.userId === 2) {
                    customicon = L.AwesomeMarkers.icon({
                        icon: 'cloud',
                        prefix: 'glyphicon',
                        markerColor: 'green'
                    }
                );
            }
            ;

            var sdt = data.dateTime;//"2012-06-22T00:05:00"; //ie and safari does not support teh date format with "-"
            var dt = new Date(sdt);
            var h = dt.getHours() + ":" + dt.getMinutes();

            var date = dateWS.split("T")[0].split("-");
            var time = dateWS.split("T")[1].split(":");

            var dateObj = new Date(date[0],date[1],date[2],time[0],time[1],time[2]);
            var h2 = dateObj.getHours() + ":" + dateObj.getMinutes();


            // add the marker to the map
            L.marker([data.latitude, data.longitude], {icon: customicon}
            ).addTo(map)

                .bindPopup("<strong style='color: #84b819'> Usuario: " + data.userId + "</strong>" +
                    "<br>Dispositivo: " + data.deviceId + " | Temperatura: " + data.temperature + "" +
                    "<br>Humedad: " + data.humidity + " | Viento: " + data.windSpeed + "" +
                    "<br>Temperatura Sensor: " + data.sensorTemperature + " | Hora: " + h2 + "" +
                    "<br>Icono: " + customicon.icon)

// close the loop, the function processData(allText) and myFunction()
        }
    } //end processData

}//end myFunction()