
faker = require('faker');

exports.seed = (knex, Promise) => {
  return Promise.all([
    // Inserts seed entries
    knex('favourites').insert({user_id: 1, map_id: 3}),
    knex('favourites').insert({user_id: 1, map_id: 4}),
    knex('favourites').insert({user_id: 1, map_id: 5}),
    knex('favourites').insert({user_id: 1, map_id: 6}),
    knex('favourites').insert({user_id: 2, map_id: 1}),
    knex('favourites').insert({user_id: 2, map_id: 2}),
    knex('favourites').insert({user_id: 3, map_id: 1}),
    knex('favourites').insert({user_id: 3, map_id: 5}),
    knex('favourites').insert({user_id: 3, map_id: 3}),
    knex('favourites').insert({user_id: 5, map_id: 5})
  ]);
};
