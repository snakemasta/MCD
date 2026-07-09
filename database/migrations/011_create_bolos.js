/**
 * BOLOs table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('bolos', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.enum('type', ['person', 'vehicle', 'weapon']).notNullable();
    table.uuid('subject_id'); // person_id or vehicle_id
    table.uuid('investigation_id').references('id').inTable('investigations');
    table.text('description');
    table.enum('status', ['active', 'inactive', 'resolved']).defaultTo('active');
    table.timestamp('expiration_date');
    table.uuid('issued_by');
    table.json('acknowledgements');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.index(['type', 'status']);
    table.index(['investigation_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('bolos');
};
