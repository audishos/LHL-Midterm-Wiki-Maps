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
      // knex('maps').select()
      knex.raw(`
      select maps.*,
      (select count(*) from favourites
      where map_id = maps.id)
      as fav_count
      from maps
      `)
      .then((results) =>{
        callback(null, results);
      })
      .catch((e) => {
        callback(e, null);
      });
    },

    // accepts a single integer and
    // returns the corresponging map object by ID
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

    // accepts an array of integers and
    // returns the corresponding map objects by ID in an array
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

    // accepts a user id (int)
    // and returns an array of map objects that they have favourited
    getUserFavourites: (userId) => {

      const promise = new Promise( (resolve, reject) => {
        if (userId >= 0) {
          knex.raw(`
            select maps.*,
            (select count(*) from favourites
            where map_id = maps.id)
            as fav_count
            from maps
            join favourites on maps.id = favourites.map_id
            join users on favourites.user_id = users.id
            where users.id = ${userId}
            `)
          .then( (res) => {
            resolve(res.rows);
          })
          .catch( (err) => {
            reject(err);
          })
        } else {
          reject(`userId: ${userId} must be >= 0`);
        }
      })

      return promise;

    },

    // accepts a user id and map id (int)
    // and adds the map to the user's favourites
    addFavourite: (userId, mapId) => {

      const promise = new Promise( (resolve, reject) => {
        if (userId > 0 && mapId > 0) {
          knex('favourites').insert({
            user_id: userId,
            map_id: mapId
          })
          .then( (res) => {
            resolve(res);
          })
          .catch( (err) => {
            reject(err);
          });
        } else {
          reject(`userId: ${userId} and mapId: ${mapId} must be > 0`);
        }
      });

      return promise;

    },

    // accepts a user id and a map id (int)
    // and removes the map from the user's favourites
    deleteFavourite: (userId, mapId) => {

      const promise = new Promise( (resolve, reject) => {
        if (userId > 0 && mapId > 0) {
          knex('favourites').where('user_id', userId).andWhere('map_id', mapId).del()
          .then( (res) => {
            resolve(res);
          })
          .catch( (err) => {
            reject(err);
          });
        } else {
          reject(`userId: ${userId} and mapId: ${mapId} must be > 0`);
        }
      });

      return promise;

    },

    // accepts a map id (int)
    // and returns the number of times it has been favourited
    getFavouriteCount: (mapId) => {

      return new Promise( (resolve, reject) => {
        if (mapId > 0) {
          knex('favourites').count()
          .where('map_id', mapId)
          .then( (res) => {
            resolve(res);
          })
          .catch( (err) => {
            reject(err);
          })
        } else {
          reject(`mapId: ${mapId} must be > 0`);
        }
      });

    },

    // accepts a user id
    // and returns an array of map objects that they have contributed to
    getUserContributions: (userId) => {

      return new Promise( (resolve, reject) => {
        if (userId > 0) {
          knex.raw(`
            select DISTINCT(maps.*),
            (select count(*) from favourites
            where map_id = maps.id)
            as fav_count
            from maps
            join points on maps.id = points.map_id
            join users on points.user_id = users.id
            where users.id = ${userId}
            `)
          .then( (res) => {
            console.log(res)
            resolve(res.rows);
          })
          .catch( (err) => {
            reject(err);
          })
        } else {
          reject(`userId: ${userId} must be > 0`);
        }
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
    getMapObject: (mapid)=>{
      return new Promise( (resolve, reject) => {
        knex('maps').where('id', mapid).select()
        .then((results)=> {
          resolve(results);
        })
        .catch((e) =>{
          reject(e);
        })
      });

    },

    //Function to obtain ALL maps
    getAllMaps: (callback)=>{
      knex('maps').select()
      .then((results)=> {
        callback(null, results);
      })
      .catch((e) =>{
        callback(e, null);
      })
    },

    addMap: (map_name, description, userId, callback) =>{
      knex.insert({
        "user_id":userId,
        "title":map_name,
        "description":description,
        "created_at": getDate()
      })
      .returning('id')
      .into('maps')
      .then((id)=>{
        callback(null, id[0]);
      })
      .catch((error) =>{
        callback(error, null);
      })
    },

    // accepts a user is (int)
    // and returns the corresponding user object
    getUser: (userId) => {

      return new Promise( (resolve, reject) => {
        if (userId > 0) {
          knex('users').select('*').first().where('id', userId)
          .then( (res) => {
            resolve(res);
          })
          .catch( (err) => {
            reject(err);
          });
        } else {
          reject(`userId: ${userId} must be > 0`);
        }
      });
    },
    savePoint: (point, callback) =>{
      delete point.id;
      knex('points').insert(point)
      .then( ()=> callback(null))
      .catch((error) => callback(error))
    },
    deletePoints: (point, callback)=>{
      knex('points').where('id', '=', point).del()
      .then(()=>{
        callback(null);
      })
      .catch((error) => {
        callback(error);
      })
    }
  }
}
