function myFunction() {
 // create variable named map, set viewpoint and default zoom level  
var map = L.map('map').setView([52.201675, 10.507759], 7);
 
// add tile layer 
  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
}).addTo(map);
 
// add a minimal zoom to prevent users from zooming out too far
  map._layersMinZoom=5;


  var srf = L.icon({
// path to the icon
      iconUrl: 'icons/SRF.png',
// size of the icon 
     iconSize:     [60, 52],
// point of the icon which will correspond to marker's location 
      iconAnchor:   [0, 26],
// point of the icon where the popup window will open
      popupAnchor: [35, -26]
  });

  var rp = L.icon({
      iconUrl: 'icons/RPData.png',
      iconSize:     [52, 60], 
      iconAnchor:   [26, 60], 
      popupAnchor: [0, -60]
  });
  
 var p1 = L.marker([47.417563, 8.560453], {icon: srf}).addTo(map);
  var p2 = L.marker([51.233059, 6.698716], {icon: rp}).addTo(map);
  
  // this is basic html! Visit http://www.w3schools.com/tags to learn about html tags!
p1.bindPopup("<strong style='color: #84b819'>SRF Data</strong><br>Schweizer Rundfunk und Fernsehen | Zürich<br>Head: Sandra Manca");
 
// the .openPopup() opens this popup when the page is loaded
p2.bindPopup("<strong style='color: #84b819'>RP Data</strong><br>Rheinsiche Post | Düsseldorf<br>Head: Phil Ninh").openPopup();
 
//var popup = L.popup();
// load json-file  
$(document).ready(function() {
      $.ajax({
          type: "GET",
          url: "json/ddj.json",
          dataType: "json",
		  crossDomain: true,
          mimeType: "application/json",
		  beforeSend : setHeader,
          success: function(data) {processData(data);},
		  error: function() { alert('Failed!!'); }

	  });
  });
function setHeader(xhr) {
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
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
 
    for (var i in allText){
             data = allText[i];
		var customicon = L.icon({
              // the iconUrl is now the ith element in data.icon 
              iconUrl: data.icon,
              iconSize:     [52, 60], // size of the icon
              iconAnchor:   [26, 60], // point of the icon which will correspond to marker's location
              popupAnchor: [0, -60] // point of the icon where the popup window will open
          });
			if (data.company === "Zeit Online") {
					customicon = L.icon({
					  iconUrl: data.icon,
					  iconSize:     [60, 52], 
					  iconAnchor:   [60, 26], 
					  popupAnchor: [-35, -26]
					  });
				  };
				  if (data.company === "Schweizer Rundfunk und Fernsehen") {
					customicon = L.icon({
					  iconUrl: data.icon,
					  iconSize:     [60, 52], 
					  iconAnchor:   [0, 26], 
					  popupAnchor: [35, -26]
					  });
				  };
		 
		// add the marker to the map
				   L.marker([data.long, data.lat], {icon: customicon})
				  .addTo(map)

  .bindPopup("<strong style='color: #84b819'>" + data.newsroom + "</strong><br>" + data.company + " | " + data.city + "<br>Head: " + data.head)
 
// close the loop, the function processData(allText) and myFunction()
          }
  } //end processData
 
}//end myFunction()