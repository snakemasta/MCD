/**
 * Audit log table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('audit_log', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable();
    table.string('action'); // create, update, delete, etc
    table.string('entity_type'); // investigation, evidence, person, etc
    table.uuid('entity_id');
    table.json('changes');
    table.string('ip_address');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.index(['user_id', 'created_at']);
    table.index(['entity_type', 'entity_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('audit_log');
};
