
exports.up = function(knex, Promise) {
  return knex.schema.createTable('blocks', (table) => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.string('start_time').notNullable();
    table.integer('day').notNullable().defaultsTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blocks');
};
