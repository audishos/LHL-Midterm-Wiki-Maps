var mapId = 2;
var map;
var arrOfMarkers = [];
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
  var contentString = "<div class='point " + point.id + "' data-point-id='" + point.id + "'><h1>" + point.title + "</h1><br><p>" + point.description + "</p><br><img src=" + point.image + "></div>"
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  })

  marker.addListener('click', function(){
    infowindow.open(map, marker);
    addMarkerListener();
  });
  marker.addListener('dblclick', function(event){
    // debugger;
    var pointId = $(event.target).data("point-id");
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
$(document).ready(function(){
  initMap();

});
