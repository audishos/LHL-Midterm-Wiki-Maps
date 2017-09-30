var userId=2;
var mapId = 2;
var map;
var newMarkers = [];
var markersDeleted = [];

//---function is run when page is loaded
function initMap(){
  // renderMap(mapId)
  map = new google.maps.Map(document.getElementById('map-container'), {
    zoom: 8,
    //should be a calculated center using point position from db
    //toronto
    center: {lat: 43.6532, lng: -79.3832},
  });
  //--once map is loaded add marker
  google.maps.event.addListenerOnce(map, 'idle', function(){
    // do something only the first time the map is loaded
    renderPoints();
  });
}

//add listener for the submission of new marker information
function addListenerToNewMarkerSubmission(marker){
  $("#new-marker-submit").on('click', function(event){
    //db reference lat and lng as full words!!!!!!!!
    var point = {
      id: "new",
      user_id: userId,
      map_id: mapId,
      title: event.target.parentElement.children[2].value,
      image: event.target.parentElement.children[6].value,
      description: event.target.parentElement.children[10].value,
      longitude: Number(event.target.parentElement.getAttribute("data-lng")),
      latitude: Number(event.target.parentElement.getAttribute("data-lat"))
    };
    //set current to null and add real one
    //logic of addMarker should render without form
    debugger;
    marker.setMap(null);
    addMarker(point);
    // google.maps.event.addListener(map, 'click', function(event){
    //   var point = {
    //     latitude:event.latLng.lat(),
    //     longitude:event.latLng.lng()
    //   }
    // })
  })
}

//adds marker to google map
function addMarker(point, bounds){
  var pos = {lat:Number(point.latitude),lng:Number(point.longitude)};
  var marker = new google.maps.Marker({
    position:pos,
    map:map
  });
  //--if new point, intialize with form--/
  if(!point.id){
    marker.pointId = "new1";
    contentString = '\
    <div class="new-point">\
    <h1>Fill out the Form and press submit to create POI!!</h1>\
    <form data-lat='  + pos.lat + ' data-lng=' + pos.lng + '>\
    <label for="mapname">Name</label><br>\
    <input id="map_name" name="name"><br>\
    <label for="description">description</label><br>\
    <input id="descipriton" name="descipriton"><br>\
    <label for="map_pic_url">url</label><br>\
    <input id="map_pic_url" name="map_pic_url"><br>\
    <button id="new-marker-submit">Submit</button>\
    </form>\
    </div>';
  } else {
    marker.pointId = point.id;
    pointId = point.id ? point.id : 0;
    pointTitle = point.title ? point.title : "AAAY";
    pointDescription = point.description ? point.description : "";
    pointImage = point.image ? point.image : "";

    newMarkers.push(point);
      //commited point get rendered fully
      var contentString = "\
      <div class='marker-content point " + pointId + "' data-point-id=" + pointId +">\
      <div class=''>\
      <h1>" + pointTitle + "</h1>\
      <p class='point-description'>" + pointDescription + "</p><br>\
      <img class='point-image' src=" + pointImage + ">\
      </div>\
      </div>"
    }
    console.log(contentString)
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    })


  //add event listener to map
  //if marker clicked dsiplay info window
  marker.addListener('click', function(){
    infowindow.open(map, marker);
    addMarkerListener();
    debugger;
    addListenerToNewMarkerSubmission(marker);
  });

  //if double clicked delete marker
  marker.addListener('dblclick', function(event){
    var pointId = marker.pointId;
    //keeping track of deleted markers
    markersDeleted.push(pointId);
    marker.setMap(null);
    $("."+pointId).remove();

  });
}

//returns array of points on map
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
//----------creates list of points in html div
function addToListOfPoints(point){
  var html = "<h3 class='point " + point.id + "' data-point-id='" + point.id + "'>" + point.title + "<h3>";
  document.getElementById("points").innerHTML = document.getElementById("points").innerHTML + html;
}

//-------------------------renders map with all existing point information from database
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

//add listener to html list of points
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

// if map is single clicked add point with info content that is a form to fillout
function newMarkerListener(){
  google.maps.event.addListener(map, 'click', function(event){
    var point = {
      latitude:event.latLng.lat(),
      longitude:event.latLng.lng()
    }
    addMarker(point);
  })
}

//delete marker from database
function deleteMarkersFromDatabase(point){
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

//-----------------------------new marker helper functions
function saveNewMarkerToDatabase(){
  $.ajax({
    url:"/maps/" + mapId +"/points/" + points,
    method:"POST",
    data:{
      point:point
    },
    success: function(){
      console.log("successful post")
    },
    error: function(error){
      console.log(error);
    }
  })
}


//updates current display of map into database
function updateDatabase(){
  for(var point = 0; point < markersDeleted.length; point++){
    deleteMarkersFromDatabase(markersDeleted[point])
  }
  for(var newPoint = 0; newPoint < newMarkers.length; newPoint++){
    saveNewMarkerToDatabase(newMarkers[newPoint])
  }
}

//-----------------------------when page is loaded
$(document).ready(function(){
  mapId = $("#mapId").data("mapid");
  initMap();
  $(".save-button").on('click', function(){
    updateDatabase();
  })

});
