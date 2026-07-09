/**
 * Warrants table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('warrants', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.enum('type', ['search', 'arrest', 'bench']).notNullable();
    table.uuid('target_person_id').references('id').inTable('persons');
    table.uuid('investigation_id').references('id').inTable('investigations');
    table.text('description');
    table.enum('status', ['pending', 'approved', 'served', 'returned', 'expired']).defaultTo('pending');
    table.uuid('judge_id');
    table.timestamp('requested_date');
    table.timestamp('approved_date');
    table.timestamp('served_date');
    table.timestamp('expiration_date');
    table.uuid('assigned_detective');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.index(['status', 'type']);
    table.index(['investigation_id']);
    table.index(['target_person_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('warrants');
};
