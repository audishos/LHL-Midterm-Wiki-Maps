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

    getFavouriteCounts: (mapIds) => {

      return new Promise( (resolve, reject) => {
        if (mapId.length > 0) {
          knex('favourites').count('*')
          .whereIn('map_id', mapIds)
          .then( (res) => {
            resolve(res);
          })
          .catch( (err) => {
            reject(err);
          })
        } else {
          reject(`mapIds: ${mapIds} must contain at least 1 numeric value`);
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
    getMapObject: (map_id, callback)=>{
      knex('maps').where('id', map_id).select()
      .then((results)=> {
        callback(null, results);
      })
      .catch((e) =>{
        callback(e, null);
      })
    }

  }
}
