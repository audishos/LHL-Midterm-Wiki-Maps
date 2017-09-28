module.exports = function makeDataHelpers(knex){
  return {
    getMaps: function(){
      knex('maps').select()
      .then((results) =>{
        console.log(results);
      })
      .catch((e) => e)
    },

    //Function to obtain a Map object
    getMapObject: (map_id) => {
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
    }

  } //End of return
} //End of module.exports