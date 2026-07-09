/**
 * Persons table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('persons', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.date('date_of_birth');
    table.string('gender');
    table.string('race');
    table.text('distinguishing_marks');
    table.string('primary_address');
    table.text('officer_notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.index(['first_name', 'last_name']);
    table.index(['date_of_birth']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('persons');
};
