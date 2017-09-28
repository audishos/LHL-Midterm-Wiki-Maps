
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions').del()
    .then( () => { return knex('favourites').del()})
    .then( () => { return knex('points').del()})
    .then( () => { return knex('maps').del()})
    .then( () => { return knex('users').del()})
};
