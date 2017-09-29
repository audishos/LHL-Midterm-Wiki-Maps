var mapId = 2;
var map;
var arrOfMarkers = [];
var markersDeleted = [];
function initMap(){
  // renderMap(mapId)
  map = new google.maps.Map(document.getElementById('map-container'), {
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
  marker.pointId = point.id;
  arrOfMarkers.push(marker);
  var contentString = "<div class='marker-content point " + point.id + "' data-point-id='" + point.id + "'><div class=''><h1>" + point.title + "</h1><p class='point-description'>" + point.description + "</p><br><img class='point-image' src=" + point.image + "></div></div>"
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  })

  marker.addListener('click', function(){
    infowindow.open(map, marker);
    addMarkerListener();
  });

  marker.addListener('dblclick', function(event){
    // debugger;
    var pointId = marker.pointId;
    markersDeleted.push(pointId);
    debugger;
    marker.setMap(null);
    $("."+pointId).remove();

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

function addToListOfPoints(point){
  var html = "<h3 class='point " + point.id + "' data-point-id='" + point.id + "'>" + point.title + "<h3>";
  document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + html;
}

function renderPoints(){
  getPointsOnMap(function(arrOfPoints){
    document.getElementById("points").innerHTML = "";
    var bounds = new google.maps.LatLngBounds();
    for(var point = 0; point < arrOfPoints.length; point++){
      addMarker(arrOfPoints[point]);
      addToListOfPoints(arrOfPoints[point]);
      var lat = Number(arrOfPoints[point].latitude);
      var lng = Number(arrOfPoints[point].longitude);
      bounds.extend({lat,lng});
    }
    map.fitBounds(bounds);
    addMarkerListener();
    newMarkerListener();
  })
}

function addMarkerListener(){
  $(".point").on('mouseover', function(event){
    // debugger;
    var pointId = $(event.target).data("point-id");
    $("."+pointId).addClass("highlighted");
  });
  $(".point").on('mouseout', function(event){
    // debugger;
    var pointId = $(event.target).data("point-id");
    $("."+pointId).removeClass("highlighted");
  });
}


function newMarkerListener(){
  google.maps.event.addListener(map, 'click', function(event){
    var point = {
      lat:event.latLng.lat(),
      lng:event.latLng.lng()
    }
    addMarker(point);
  })
}

function deleteMarkers(){
  $.ajax({
    url:"/maps/" + mapId + "/points",
    method:"DELETE",
    success: function(){
      arrOfMarkers: arrOfMarkers
    },
    error: function(error){
      console.log("error");
    }
  })
}

$(document).ready(function(){
  initMap();
  $(".save-button").on('click', function(){
    deleteMarkers();
  })

});
