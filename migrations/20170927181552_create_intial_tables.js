
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.date('created_at');
    }),

    knex.schema.createTable('maps', function(table){
      table.increments();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('title');
      table.text('description');
      table.string('long');
      table.string('lat');
      table.date('created_at');
    }),

    knex.schema.createTable('points', function(table){
      table.increments();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('map_id').unsigned();
      table.foreign('map_id').references('maps.id');
      table.string('title');
      table.string('image');
      table.text('description');
      table.date('created_at');
    }),

    knex.schema.createTable('favourites', function(table){
      table.integer('user_id').unsigned();
      table.integer('map_id').unsigned();
      table.primary(['user_id','map_id']);
      table.foreign('user_id').references('users.id');
      table.foreign('map_id').references('maps.id');
    }),

    knex.schema.createTable('permissions', function(table){
      table.integer('user_id').unsigned();
      table.integer('map_id').unsigned();
      table.primary(['user_id','map_id']);
      table.foreign('map_id').references('maps.id');
      table.foreign('user_id').references('users.id');
      table.integer('permission');
    })

    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favourites'),
    knex.schema.dropTable('permissions'),
    knex.schema.dropTable('points'),
    knex.schema.dropTable('maps'),
    knex.schema.dropTable('users')
    ])
};
