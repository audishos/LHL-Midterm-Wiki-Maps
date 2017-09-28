module.exports = function makeDataHelpers(knex){
  return {
    getMaps: function(){
      knex('maps').select()
      .then((results) =>{
        console.log(results);
      })
      .catch((e) => e)
    },

    //Function to calulate the coordinates for the center of the map
    calcuateCenterOfMap: (map_id) => {
      let latMax = knex('points').where({
        map_id: map_id
      }).max('latitude');

      let latMin = knex('points').where({
        map_id: map_id
      }).min('latitude');

      let longMax = knex('points').where({
        map_id: map_id
      }).max('longitude');

      let longMin = knex('points').where({
        map_id: map_id
      }).min('longitude');

      return {
        latCenter: (latMax + latMin)/2,
        longCenter: (longMax + longMin)/2
      }
            
    },
    //Function to render the Title and Description of a Map
    renderTitleDesc: (map_id) => {
      const promise = new Promise( (resolve, reject) => {
        knex('maps').select()
        .where('id', map_id)
        .then( (res) => {
          resolve(res);
        })
        .catch( (err) => {
          reject(err);
        })
      })
      return promise;
    },

    // Function to create a map and append it to view.html
    renderMap: (map_id) => {
      $("#map-container").html("");

      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById("map-container"), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
    }






  } //End of return
} //End of module.exports