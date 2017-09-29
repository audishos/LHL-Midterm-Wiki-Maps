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
        if (userId > 0) {
          // knex('maps')
          // .join('favourites', 'maps.id', 'favourites.map_id')
          // .join('users', 'favourites.user_id', 'users.id')
          // .select('maps.*')
          // .where('users.id', userId)
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
          reject(`userId: ${userId} must be > 0`);
        }
      })

      return promise;

    },

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
    getMapObject: (mapid, callback)=>{
      knex('maps').where('id', mapid).select()
      .then((results)=> {
        callback(null, results);
      })
      .catch((e) =>{
        callback(e, null);
      })
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
    },

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

    }

  }
}
