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
            var contentString = `<div style="color:black;">
            <p>Name: ${markers [i][7]}</p></br>
            <p>Image: <img src = "${markers[i][3]}" style="width:80px;height:80px;"></p></br>
            <p>Description: ${markers[i][1]}</p>
          </div>`;
              infowindow.setContent(contentString);
              infowindow.open(map, marker);
          }
      })(marker, i));
  }
  map.fitBounds(bounds);
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


//Creating an AJAX Request to maps/:mapid/points
$(document).ready(function () {
  console.log("document is ready")
  getPointsForMap();


});