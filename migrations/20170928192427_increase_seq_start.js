
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.raw('ALTER SEQUENCE ' + 'maps_id_seq' + ' START WITH 100'),
    knex.raw('ALTER SEQUENCE ' + 'maps_id_seq' + ' RESTART WITH 100'),
    knex.raw('ALTER SEQUENCE ' + 'points_id_seq' + ' START WITH 100'),
    knex.raw('ALTER SEQUENCE ' + 'points_id_seq' + ' RESTART WITH 100'),
    knex.raw('ALTER SEQUENCE ' + 'users_id_seq' + ' START WITH 100'),
    knex.raw('ALTER SEQUENCE ' + 'users_id_seq' + ' RESTART WITH 100')
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.raw('ALTER SEQUENCE ' + 'maps_id_seq' + ' START WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'maps_id_seq' + ' RESTART WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'points_id_seq' + ' START WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'points_id_seq' + ' RESTART WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'users_id_seq' + ' START WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'users_id_seq' + ' RESTART WITH 1')
  ])
};
