
const faker = require('faker');

exports.seed = (knex, Promise) => {
  return Promise.all([
    //Insert seed entries
    knex('maps').insert({
      id: 1,
      user_id: 1,
      title: "Rahul's favorite restaurants",
      description: "This map contains a list of Rahul's favorite restaurants. Please feel free to view them and favorite them if you like!",
      created_at: "2017-08-30T10:15:35.560Z"
    }),
    knex('maps').insert({
      id: 2,
      user_id: 1,
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      created_at: faker.date.past()
    }),
    knex('maps').insert({
      id: 3,
      user_id: 4,
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      created_at: faker.date.past()
    }),
    knex('maps').insert({
      id: 4,
      user_id: 4,
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      created_at: faker.date.past()
    }),
    knex('maps').insert({
      id: 5,
      user_id: 6,
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      created_at: faker.date.past()
    }),
    knex('maps').insert({
      id: 6,
      user_id: 3,
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      created_at: faker.date.past()
    })
  ])
};
