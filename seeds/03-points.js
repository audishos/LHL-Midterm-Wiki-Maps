
faker = require('faker');

exports.seed = (knex, Promise) => {
  return Promise.all([
    // Inserts seed entries
    knex('points').insert({
      id: 1,
      user_id: 1,
      map_id: 1,
      title: "Thai Fantasy",
      image: "http://www.thaifantasy.ca/images/thai-fantasy.jpg",
      description: "Great Thai restaurant with excellent Green curry!",
      longitude: -79.3848093,
      latitude: 43.6651203,
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 2,
      user_id: 1,
      map_id: 1,
      title: "Dominos Pizza",
      image: "https://s3-media4.fl.yelpcdn.com/bphoto/i2-wMPr2_jS8yKl0o2EWXw/ls.jpg",
      description: "Great pizza place with a variety of pizzas and other fan-favorites. Excellent home delivery service included!",
      longitude: -79.3920218,
      latitude: 43.6433776,
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 3,
      user_id: 1,
      map_id: 1,
      title: "Rodney's Oyster House",
      image: "http://www.blogto.com/listings/restaurants/upload/2016/05/20160502-590-Rodneys8.jpg",
      description: "Longtime, casual eatery specializing in oysters & seasonal seafood dishes, plus drinks.",
      longitude: -79.3968452,
      latitude: 43.6449473,
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 4,
      user_id: 2,
      map_id: 1,
      title: "Miku Toronto",
      image: "https://mikutoronto.com/wp-content/uploads/2014/01/sashimi-1500x630.jpg",
      description: "Flame-seared sushi is the specialty at this Japanese fine-dining destination with soaring ceilings.",
      longitude: -79.377493,
      latitude: 43.641182,
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 5,
      user_id: 3,
      map_id: 1,
      title: "Tundra Restaurant and Bar",
      image: "https://s3-media3.fl.yelpcdn.com/bphoto/KCW8v3qxflf1EjdQveB1YA/348s.jpg",
      description: "Refined menu & decor evoke the North at the Hilton, plus a chic bar mixing signature cocktails.",
      longitude: -79.3854472,
      latitude: 43.6496155,
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 6,
      user_id: 2,
      map_id: 2,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 7,
      user_id: 2,
      map_id: 2,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 8,
      user_id: 3,
      map_id: 3,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 9,
      user_id: 3,
      map_id: 4,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 10,
      user_id: 6,
      map_id: 5,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 11,
      user_id: 3,
      map_id: 6,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 12,
      user_id: 2,
      map_id: 6,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 13,
      user_id: 5,
      map_id: 6,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 14,
      user_id: 5,
      map_id: 6,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 15,
      user_id: 4,
      map_id: 4,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 16,
      user_id: 1,
      map_id: 2,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 17,
      user_id: 5,
      map_id: 6,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 18,
      user_id: 3,
      map_id: 2,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 19,
      user_id: 4,
      map_id: 4,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 20,
      user_id: 5,
      map_id: 3,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
  ]);
};
