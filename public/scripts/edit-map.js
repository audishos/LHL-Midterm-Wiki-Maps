var userId=2;
var mapId = 2;
var newMarkerIncrement = 1;
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
    var pathToForm = event.target.parentElement.parentElement.getElementsByClassName("formgroup");
    var point = {
      id: event.target.parentElement.parentElement.getAttribute("data-point-id"),
      user_id: userId,
      map_id: mapId,
      title: pathToForm[0].children[1].value,
      image: pathToForm[2].children[1].value,
      description: pathToForm[1].children[1].value,
      longitude: Number(event.target.parentElement.parentElement.getAttribute("data-lng")),
      latitude: Number(event.target.parentElement.parentElement.getAttribute("data-lat"))
    };
    //set current to null and add real one
    //logic of addMarker should render without form
    marker.setMap(null);
    addMarker(point);
  })
}

//adds marker to google map
function addMarker(point, bounds){
  var pos = {lat:Number(point.latitude),lng:Number(point.longitude)};
  var marker = new google.maps.Marker({
    position:pos,
    animation: google.maps.Animation.DROP,
    map:map
  });
  //--if new point, intialize with form--/
  if(!point.id){
    marker.pointId = "new" + newMarkerIncrement;
    newMarkerIncrement++;
    contentString = '\
    <div class="new' + newMarkerIncrement + '">\
      <h1>Create New Point</h1>\
        <form data-lat='  + pos.lat + ' data-lng=' + pos.lng + ' data-point-id=' + marker.pointId + '>\
          <div class="formgroup">\
            <label for="point_name">Name</label>\
            <input id="point_name" type="text" class="form-control" name="point_name">\
          </div>\
          <div class="formgroup">\
            <label for="description">Description</label>\
            <textarea id="description" rows="10" class="form-control" name="description"></textarea>\
          </div>\
          <div class="formgroup">\
            <label for="map_pic_url">Picture URL</label>\
            <input id="map_pic_url" type="text" class="form-control" name="map_pic_url">\
          </div>\
          <div class="formgroup">\
            <button id="new-marker-submit" class="btn btn-primary">\
            Next\
            <i class="fa fa-arrow-right" aria-hidden="true"></i>\
            </button>\
          </div>\
        </form>\
        <div>';
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
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    })


  //add event listener to map
  //if marker clicked dsiplay info window
  marker.addListener('click', function(){
    infowindow.open(map, marker);
    addMarkerListener();
    addListenerToNewMarkerSubmission(marker);
  });

  //if double clicked delete marker
  marker.addListener('dblclick', function(event){
    var pointId = marker.pointId;
    if(!Number(pointId)){
      deleteNewMarkerFromArr(pointId);
    } else {
      //keeping track of deleted markers
      markersDeleted.push(pointId);
      $("."+pointId).remove();
    }
    marker.setMap(null);

  });
}

//returns array of points on map
function getPointsOnMap(callback){
  $.ajax({
    url:"/maps/"+mapId+"/points",
    method:"GET",
    success: function(data){
      callback(data);
    },
    error: function(err){
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
    if( arrOfPoints.length > 0){
      var bounds = new google.maps.LatLngBounds();
      for(var point = 0; point < arrOfPoints.length; point++){
        addMarker(arrOfPoints[point]);
        addToListOfPoints(arrOfPoints[point]);
        var lat = Number(arrOfPoints[point].latitude);
        var lng = Number(arrOfPoints[point].longitude);
        bounds.extend({lat,lng});
      }
      map.fitBounds(bounds);
      if(map.getZoom() > 18){
        map.setZoom(12);
      }
    }

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

function deleteNewMarkerFromArr(newId){
  var arrHold = []
  for(var point = 0; point < newMarkers.length; point++){
    if(newMarkers[point].id !== newId){
      arrHold.push(newMarkers[point])
    }
  }
  newMarkers = arrHold;
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
      console.log("marker deleted from database");
    },
    error: function(error){
      console.log(error);
    }
  })
}

//-----------------------------new marker helper functions
function saveNewMarkerToDatabase(point){
  $.ajax({
    url:"/maps/" + mapId +"/points",
    method:"POST",
    data:{
      point:point
    },
    success: function(){
      console.log("successfully saved marker")
    },
    error: function(error){
      console.log("could not save new marker to database ", error);
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
  location.href = "/maps/"+ mapId + "/view"
}

function centerMap(cityCountry){
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityCountry,
    method: "GET",
    success: function(data){
      debugger;
      map.setCenter(data.results[0].geometry.location);
      map.setZoom(8)
    },
    error: function (error){
      console.log(error);
    }
  })
}

//-----------------------------when page is loaded
$(document).ready(function(){
  mapId = $("#mapId").data("mapid");
  userId = $("#mapId").data("userid");
  initMap();
  $(".save-button").on('click', function(){
    updateDatabase();
  })
  $("#search-city").on('click', function(event){
    debugger;
    centerMap(event.target.parentElement.children[1].value);
  })

});
