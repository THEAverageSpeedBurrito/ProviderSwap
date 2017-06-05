
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shifts', (table) => {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.text('blocks').defaultsTo('[]'); //Contains a JSON object with ids of all associated blocks
    table.float('compensation').defaultsTo(0.0); //Monetary compensation for taking shift
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shifts');
};
