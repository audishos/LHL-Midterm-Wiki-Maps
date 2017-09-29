var mapId = 2;
var map;
function initMap(){
  // renderMap(mapId)
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    //should be a calculated center using point position from db
    center: {lat: -33.872, lng: 151.252},
  });

  google.maps.event.addListenerOnce(map, 'idle', function(){
    // do something only the first time the map is loaded
    renderPoints();
  });
}

function addMarker(point, bounds){
  var pos = {lat:Number(point.latitude),lng:Number(point.longitude)};
  var marker = new google.maps.Marker({
    position:pos,
    map:map
  });
  var contentString = "<h1>" + point.title + "</h1><br><p>" + point.description + "</p>";
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

function getMapInfo(callback){
  $.ajax({
    url:"/maps/"+mapId,
    method:"GET",
    success: function(data){
      console.log(data);
    },
    error: function(err){
      console.log(err);
    }
  })
}

function getPointsOnMap(callback){
  $.ajax({
    url:"/maps/"+mapId+"/points",
    method:"GET",
    success: function(data){
      // console.log(data);
      callback(data);
    },
    error: function(err){
      console.log(err);
    }
  })
}

function renderPoints(){
  getPointsOnMap(function(arrOfPoints){
    var bounds = new google.maps.LatLngBounds();
    for(var point = 0; point < arrOfPoints.length; point++){
      addMarker(arrOfPoints[point])
      debugger;
      var lat = Number(arrOfPoints[point].latitude);
      var lng = Number(arrOfPoints[point].longitude);
      bounds.extend({lat,lng});
    }
    map.fitBounds(bounds);
  })
}
$(document).ready(function(){
  initMap();

});
