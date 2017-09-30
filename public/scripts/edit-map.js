var mapId = 2;
var map;
var newMarkers = [];
var markersDeleted = [];
function initMap(){
  // renderMap(mapId)
  map = new google.maps.Map(document.getElementById('map-container'), {
    zoom: 8,
    //should be a calculated center using point position from db
    center: {lat: 43.6532, lng: -79.3832},
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
  if(!point.id){
    marker.pointId = "new1";
    contentString = '\
    <h1>Fill out the Form and press submit to create POI!!</h1>\
    <form method="POST" action="./mapsid/edit">\
    <label for="mapname">Name</label><br>\
    <input id="map_name" name="name"><br>\
    <label for="description">description</label><br>\
    <input id="descipriton" name="descipriton"><br>\
    <label for="map_pic_url">url</label><br>\
    <input id="map_pic_url" name="map_pic_url"><br>\
    <input type="submit">\
    </form>';
  } else {
    marker.pointId = point.id;
    pointId = point.id ? point.id : 0;
    pointTitle = point.title ? point.title : "AAAY";
    pointDescription = point.description ? point.description : "";
    pointImage = point.image ? point.image : "";

    newMarkers.push(point);
    var contentString = "\
    <div class='marker-content point " + pointId + "' data-point-id='" + pointId +"'>\
      <div class=''>\
        <h1>" + pointTitle + "</h1>\
        <p class='point-description'>" + pointDescription + "</p><br>\
        <img class='point-image' src=" + pointImage + ">\
      </div>\
    </div>"
    // console.log(contentString);
  }
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  })

  marker.addListener('click', function(){
    infowindow.open(map, marker);
    addMarkerListener();
  });

  marker.addListener('dblclick', function(event){
    var pointId = marker.pointId;
    markersDeleted.push(pointId);
    marker.setMap(null);
    $("."+pointId).remove();

  });
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
    newMarkers = [];
  })
}

function addMarkerListener(){
  $(".point").on('mouseover', function(event){
    var pointId = $(event.target).data("point-id");
    $("."+pointId).addClass("highlighted");
  });
  $(".point").on('mouseout', function(event){
    var pointId = $(event.target).data("point-id");
    $("."+pointId).removeClass("highlighted");
  });
}


function newMarkerListener(){
  google.maps.event.addListener(map, 'click', function(event){
    var point = {
      latitude:event.latLng.lat(),
      longitude:event.latLng.lng()
    }
    addMarker(point);
  })
}

function deleteMarkers(point){
  $.ajax({
    url:"/maps/" + mapId + "/points/"+point,
    method:"DELETE",
    data:{
      point: point
    },
    success: function(){
      console.log("aaasas")
    },
    error: function(error){
      console.log("error");
    }
  })
}
function updateDatabase(){
  for(var point = 0; point < markersDeleted.length; point++){
    deleteMarkers(markersDeleted[point])
  }
}

$(document).ready(function(){
  mapId = $("#mapId").data("mapid");
  initMap();
  $(".save-button").on('click', function(){
    updateDatabase();
  })

});
