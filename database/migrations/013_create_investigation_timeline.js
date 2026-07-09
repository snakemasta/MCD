/**
 * Investigation timeline events table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('investigation_timeline', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('investigation_id').notNullable().references('id').inTable('investigations').onDelete('CASCADE');
    table.string('event_type'); // report, evidence_collected, interview, warrant, etc
    table.text('description');
    table.timestamp('event_date').notNullable();
    table.uuid('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.index(['investigation_id', 'event_date']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('investigation_timeline');
};
