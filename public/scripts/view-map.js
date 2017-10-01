var map;
function createMapWithPoints(data) {
  //Converting to array of arrays - Warning: Array is inverted
  var markers = data.map(function(obj) {
    return Object.keys(obj).sort().map(function(key) {
      return obj[key];
    });
  });

  console.log("Arr of arr is:",markers);
  var myOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
  };
  map = new google.maps.Map(document.getElementById("map-container"),myOptions);
  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  var bounds = new google.maps.LatLngBounds();

  for (i = 0; i < markers.length; i++) {
      var pos = new google.maps.LatLng(markers[i][4], markers[i][5]);
      bounds.extend(pos);
      marker = new google.maps.Marker({
          position: pos,
          map: map
      });
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            var contentString = `<div style="color:black;">
            <p style = "font-size: larger;margin: 0; font-weight: bold;color: #ab5348;">${markers [i][7]}</p></br>
            <span><img src = "${markers[i][3]}" style="width:150px;height:180px;float:right;"></span></br>
            <p style = "margin: 0;font-size: larger;font-weight: bolder;color: black;">${markers[i][1]}</p>
          </div>`;
              infowindow.setContent(contentString);
              infowindow.open(map, marker);
          }
      })(marker, i));
  }
  map.fitBounds(bounds);
  google.maps.event.addListenerOnce(map, 'idle', function(){
    // do something only the first time the map is loaded
    if(markers.length <=0){
      map.setCenter({lat: 43.6532, lng: -79.3832});
      map.setZoom(8)
    }
    if(map.getZoom() > 18){
     map.setZoom(12);
    };
  })
}

//AJAX call to obtain the points to plot on the map
function getPointsForMap() {

  let holder = location.pathname.split('/');
  let map_id = holder[holder.length - 2];
  var pointsHolder = {};
  $.ajax({
    url: `/maps/${map_id}/points`,
    method: "GET",
    dataType: 'JSON',
    success: function (data){
      pointsHolder = data;
      console.log("This data being passed into create maps",data);
      createMapWithPoints(data);
    },
    error: function(){
      console.log("Something has gone wrong with getting the data!");
    }
  });


}

function deleteFavourite(star, mapId) {

  $.ajax({
    url: "/maps/" + mapId + "/favourites",
    type: "DELETE",
    success: function(result) {
      star.removeClass("fa-star");
      star.addClass("fa-star-o");
    },
    error: function(error) {
      console.error(error);
    }
  });
}

function addFavourite(star, mapId) {

  $.ajax({
    url: "/maps/" + mapId + "/favourites",
    type: "POST",
    success: function(result) {
      star.removeClass("fa-star-o");
      star.addClass("fa-star");
    },
    error: function(error) {
      console.error(error);
    }
  });
}


//Creating an AJAX Request to maps/:mapid/points
$( function () {
  console.log("document is ready")
  getPointsForMap();

  $("#map-title-container i").on("click", function(ev) {
  // adding and removing map from current authed user's favourites
    var star = $(ev.target);
    var mapId = star.closest("#map-title-container").data("map-id");

    if (star.hasClass("fa-star-o")) {
      addFavourite(star, mapId);
    } else {
      deleteFavourite(star, mapId);
    }
  });

});
