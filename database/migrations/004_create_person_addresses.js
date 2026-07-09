/**
 * Person addresses table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('person_addresses', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('person_id').notNullable().references('id').inTable('persons').onDelete('CASCADE');
    table.string('address').notNullable();
    table.string('city');
    table.string('state');
    table.string('zip_code');
    table.string('type'); // home, work, known, etc
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.index(['person_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('person_addresses');
};
