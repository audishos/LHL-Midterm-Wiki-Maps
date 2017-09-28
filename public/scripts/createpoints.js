
var map;
//should be a ajax request to db
var arrOfPoints =[];
var allMarkers =[];
//function that is run on google api callback
$("#ajax").on('click', function(event){
  $.ajax({
    url:"/api/maps/1/points",
    method:"GET",
    success: function(data){
      debugger;
        console.log(data);
      },
      error: function(e){
        console.log("oops")
      }
    })
})
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    //should be a calculated center using point position from db
    center: {lat: -33.872, lng: 151.252},
  });
  function addMarker(coordsObj){
    var marker = new google.maps.Marker({
      position:coordsObj,
      map:map
    });
    allMarkers.push(marker);
    var contentString = `
    <h1>Fill out the Form and press submit to create POI!!</h1>
    <form method="POST" action="./mapsid/edit">
    <label for="mapname">Name</label><br>
    <input id="map_name" name="name"><br>
    <label for="description">description</label><br>
    <input id="descipriton" name="descipriton"><br>
    <label for="map_pic_url">url</label><br>
    <input id="map_pic_url" name="map_pic_url"><br>
    <input type="submit">
    </form>`
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    })

    marker.addListener('click', function(){
      infowindow.open(map, marker);
    });
    marker.addListener('dblclick', function(event){
        // debugger;
        marker.setMap(null);
      });
  }
  google.maps.event.addListener(map, 'click', function(event){
    arrOfPoints.push({lat:event.latLng.lat(), lng:event.latLng.lng()});
    addMarker({lat:event.latLng.lat(), lng:event.latLng.lng()});
  })
}

