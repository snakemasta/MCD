/**
 * Person aliases table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('person_aliases', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('person_id').notNullable().references('id').inTable('persons').onDelete('CASCADE');
    table.string('alias').notNullable();
    table.string('type'); // nickname, street name, etc
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.index(['person_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('person_aliases');
};
