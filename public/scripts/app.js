// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

//Sample data
var data = [
  ['Location A', -33.890542, 151.274856],
  ['Location B', -33.923036, 151.259052],
  ['Location C', -70.028249, 151.157507],
  ['Location D', -33.80010128657071, 151.28747820854187],
  ['Location E', -45.950198, 151.259302]
  ];

function createMapWithPoints(data) {
  //Converting to array of arrays
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
  var map = new google.maps.Map(document.getElementById("map-container"),myOptions);
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
              infowindow.setContent(markers[i][7]);
              infowindow.open(map, marker);
          }
      })(marker, i));
  }
  map.fitBounds(bounds);
}

//AJAX call to obtain the points to plot on the map
function getPointsForMap() {

  var pointsHolder = {};
  $.ajax({
    url: "/maps/1/points",
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


//Creating an AJAX Request to maps/:mapid/points
$(document).ready(function () {
  console.log("document is ready")
  getPointsForMap();


});