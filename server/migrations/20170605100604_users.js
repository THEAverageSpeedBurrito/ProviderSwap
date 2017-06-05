
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name').notNullable().defaultsTo('Max Rockatansky')
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.text('profile_img').notNullable().defaultsTo('');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
