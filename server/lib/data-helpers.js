function getDate(){
  var date;
  date = new Date();
  date = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2) + ' ' +
  ('00' + date.getUTCHours()).slice(-2) + ':' +
  ('00' + date.getUTCMinutes()).slice(-2) + ':' +
  ('00' + date.getUTCSeconds()).slice(-2);
  return date;
}
module.exports = function makeDataHelpers(knex){
  return {
    getMaps: (callback)=>{
      knex('maps').select()
      .then((results) =>{
        callback(null, results);
      })
      .catch((e) => {
        callback(e, null);
      });
    },

    getMapById: (mapId) => {
      const promise = new Promise( (resolve, reject) => {
        knex('maps').select()
        .where('id', mapId)
        .first()
        .then( (res) => {
          resolve(res);
        })
        .catch( (err) => {
          reject(err);
        })
      })
      return promise;
    },

    getMapsByIds: (mapIds) => {
      const promise = new Promise( (resolve, reject) => {
        knex('maps').select()
        .whereIn('id', mapIds)
        .then( (res) => {
          resolve(res);
        })
        .catch( (err) => {
          reject(err);
        })
      })
      return promise;
    },

    getUserFavourites: (userId) => {
      const promise = new Promise( (resolve, reject) => {
        knex('favourites').select()
        .where('user_id', userId)
        .then( (res) => {
          resolve(res);
        })
        .catch( (err) => {
          reject(err);
        })
      })
    },

    getPointsOnMap: (mapid, callback)=>{
      knex('points').where('map_id', '=', mapid).select()
      .then((results)=> {
        callback(null, results);
      })
      .catch((e) =>{
        callback(e, null);
      })
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
    },
    addMap: (map_name, description, userId, callback) =>{
      console.log(map_name);
      console.log(description);
      knex.insert({
        "user_id":userId,
        "title":map_name,
        "description":description,
        "created_at": getDate()
      })
      // .returning('id')
      .into('maps')
      .then((results)=>{
        console.log(results);
        callback(null, results);
      })
      .catch((error) =>{
        callback(error, null);
      })
    }

  }
}
