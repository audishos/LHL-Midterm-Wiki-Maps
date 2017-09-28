
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('created_at');
    }),

    knex.schema.table('maps', (table) => {
      table.dropColumn('created_at');
    }),

    knex.schema.table('points', (table) => {
      table.dropColumn('created_at');
    }),

    knex.schema.table('users', (table) => {
      table.datetime('created_at');
    }),

    knex.schema.table('maps', (table) => {
      table.datetime('created_at');
    }),

    knex.schema.table('points', (table) => {
      table.datetime('created_at');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('created_at');
    }),

    knex.schema.table('maps', (table) => {
      table.dropColumn('created_at');
    }),

    knex.schema.table('points', (table) => {
      table.dropColumn('created_at');
    }),

    knex.schema.table('users', (table) => {
      table.date('created_at');
    }),

    knex.schema.table('maps', (table) => {
      table.date('created_at');
    }),

    knex.schema.table('points', (table) => {
      table.date('created_at');
    })
  ]);
};
