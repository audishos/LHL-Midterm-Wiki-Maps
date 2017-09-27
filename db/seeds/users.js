var faker = require('faker');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: faker.name.findName()}),
        knex('users').insert({id: 2, name: faker.name.findName()}),
        knex('users').insert({id: 3, name: faker.name.findName()}),
        knex('users').insert({id: 4, name: faker.name.findName()}),
        knex('users').insert({id: 5, name: faker.name.findName()})
      ]);
    });
};
