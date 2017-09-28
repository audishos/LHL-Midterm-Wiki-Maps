
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('maps', (table) => {
      table.dropColumns('long', 'lat');
    }),
    knex.schema.table('points', (table) => {
      table.decimal('longitude', 9, 6);
    }),
    knex.schema.table('points', (table) => {
      table.decimal('latitude', 9, 6);
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('points', (table) => {
      table.dropColumns('longitude', 'latitude');
    }),
    knex.schema.table('maps', (table) => {
      table.string('long');
    }),
    knex.schema.table('maps', (table) => {
      table.decimal('lat');
    })
  ]);
};
