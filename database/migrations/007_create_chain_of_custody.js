/**
 * Chain of custody table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('chain_of_custody', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('evidence_id').notNullable().references('id').inTable('evidence').onDelete('CASCADE');
    table.uuid('received_by').notNullable();
    table.string('received_from');
    table.timestamp('received_date').notNullable();
    table.timestamp('released_date');
    table.uuid('released_to');
    table.text('notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.index(['evidence_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('chain_of_custody');
};
