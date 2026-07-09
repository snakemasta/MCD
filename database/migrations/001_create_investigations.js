/**
 * Investigation table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('investigations', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('case_number').unique().notNullable();
    table.string('title').notNullable();
    table.text('description');
    table.enum('status', ['active', 'cold', 'closed']).defaultTo('active');
    table.enum('priority', ['low', 'medium', 'high', 'critical']).defaultTo('medium');
    table.string('case_type');
    table.string('location');
    table.uuid('assigned_to');
    table.uuid('supervisor_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.index(['status', 'priority']);
    table.index(['assigned_to']);
    table.index(['supervisor_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('investigations');
};
