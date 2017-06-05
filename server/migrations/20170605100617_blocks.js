
exports.up = function(knex, Promise) {
  return knex.schema.createTable('blocks', (table) => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.timestamp('start_time').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blocks');
};
