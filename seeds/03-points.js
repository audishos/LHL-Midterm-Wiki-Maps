
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
      title: "Royal Ontario Museum",
      image: "http://www.canadianseniors.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/o/u/outside.jpg",
      description: "The Royal Ontario Museum is a museum of art, world culture and natural history in Toronto, Ontario, Canada.",
      longitude: -79.3947771,
      latitude: 43.6677097,
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 7,
      user_id: 2,
      map_id: 2,
      title: "Aga Khan Museum",
      image: "https://c1.staticflickr.com/6/5593/15286007722_42574f452d_b.jpg",
      description: "Museum noted for its bright white, contemporary architecture & exhibits tracing Islamic culture.",
      longitude: -79.3322955,
      latitude: 43.7251002,
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 8,
      user_id: 2,
      map_id: 2,
      title: "Art Gallery of  Ontario",
      image: "http://www.ellisdon.com/wp-content/uploads/2016/02/single_column_figure3@2x-16.jpg",
      description: "Large gallery with huge Canadian collection, European masterworks & a major Frank Gehry renovation.",
      longitude: -79.394701,
      latitude: 43.6536066,
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 9,
      user_id: 2,
      map_id: 2,
      title: "Gardiner Museum",
      image: "https://images.adsttc.com/media/images/55e6/1615/2347/5d91/1500/0079/slideshow/1304886481_gardiner-ph-tom-arban-photography-12.jpg?1441142287",
      description: "Besides exhibits, this ceramics museum offers classes, lectures & tours, plus a bistro & gift shop.",
      longitude: -79.3930829,
      latitude: 43.6681404,
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
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
      id: 17,
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
      id: 18,
      user_id: 1,
      map_id: 5,
      title: faker.company.companyName(),
      image: faker.image.cats(),
      description: faker.lorem.paragraph(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      created_at: faker.date.past()
    }),
    knex('points').insert({
      id: 19,
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
      id: 20,
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
      id: 21,
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
      id: 22,
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
