
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function(table){
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.date('created_at');
    }),

    knex.schema.createTableIfNotExists('maps', function(table){
      table.increments();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('title');
      table.text('description');
      table.string('long');
      table.string('lat');
      table.date('created_at');
    }),

    knex.schema.createTableIfNotExists('points', function(table){
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

    knex.schema.createTableIfNotExists('favourites', function(table){
      table.integer('user_id').unsigned();
      table.integer('map_id').unsigned();
      table.primary(['user_id','map_id']);
      table.foreign('user_id').references('users.id');
      table.foreign('map_id').references('maps.id');
    }),

    knex.schema.createTableIfNotExists('permissions', function(table){
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
    knex.schema.dropTableIfExists('favourites'),
    knex.schema.dropTableIfExists('permissions'),
    knex.schema.dropTableIfExists('points'),
    knex.schema.dropTableIfExists('maps'),
    knex.schema.dropTableIfExists('users')
    ])
};
