
const faker = require('faker');

exports.seed = (knex, Promise) => {
  return Promise.all([
    // Inserts seed entries
    knex('users').insert({
      id: 1,
      first_name: "Rahul",
      last_name: "Ramesh",
      email: "rahul.ramesh@hotmail.com",
      password: "abcd1234",
      created_at: "2017-08-25T10:19:35.560Z"
    }),
    knex('users').insert({
      id: 2,
      first_name: "Nicholas",
      last_name: "Smilovic",
      email: "nicholas@gmail.com",
      password: "abcd1234",
      created_at: "2017-05-25T10:19:35.560Z"
    }),
    knex('users').insert({
      id: 3,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: faker.date.past()
    }),
    knex('users').insert({
      id: 4,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: faker.date.past()
    }),
    knex('users').insert({
      id: 5,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: faker.date.past()
    }),
    knex('users').insert({
      id: 6,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: faker.date.past()
    })
  ]);
};
